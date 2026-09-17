import type { FastifyInstance } from "fastify";
import { OidcClient } from "./oidc.ts";
import { generateCodeVerifier, generateCodeChallenge, generateState } from "./oidc.ts";
import { createPendingStore } from "./pending.ts";
import { createSession, verifySession } from "./session.ts";

export interface AuthRoutesOptions {
  oidc: OidcClient;
  sessionSecret: string;
  sessionTtlSeconds: number;
}

const PROVIDERS = ["email", "apple", "google"] as const;
type Provider = (typeof PROVIDERS)[number];

export function registerAuthRoutes(
  app: FastifyInstance,
  options: AuthRoutesOptions,
): void {
  const pending = createPendingStore();

  app.get<{ Querystring: { provider?: string } }>("/auth/login", async (req, reply) => {
    const provider = (req.query.provider ?? "email") as Provider;
    if (!PROVIDERS.includes(provider)) {
      return reply.code(400).send({ error: "unsupported_provider" });
    }
    await options.oidc.discover();
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    pending.set(state, { codeVerifier, provider, createdAt: Date.now() });
    return reply.send({
      url: options.oidc.authUrl({ state, codeChallenge, provider }),
    });
  });

  app.get<{ Querystring: { code?: string; state?: string } }>(
    "/auth/callback",
    async (req, reply) => {
      const { code, state } = req.query;
      if (!code || !state) {
        return reply.code(400).send({ error: "missing_params" });
      }
      const entry = pending.get(state);
      if (!entry) {
        return reply.code(400).send({ error: "invalid_state" });
      }
      pending.delete(state);
      await options.oidc.discover();
      const tokens = await options.oidc.exchangeCode({
        code,
        codeVerifier: entry.codeVerifier,
      });
      void tokens;
      // id_token claims (sub) would come from the provider; skeleton issues a
      // session keyed by provider subject once real verification lands (T05).
      const session = await createSession({
        secret: options.sessionSecret,
        subject: state,
        provider: entry.provider,
        ttlSeconds: options.sessionTtlSeconds,
      });
      return reply.send({ session });
    },
  );

  app.get<{ Querystring: { token?: string } }>("/auth/me", async (req, reply) => {
    const token = req.query.token;
    if (!token) {
      return reply.code(401).send({ error: "missing_token" });
    }
    try {
      const claims = await verifySession({ secret: options.sessionSecret, token });
      return reply.send({ sub: claims.sub, provider: claims.provider });
    } catch {
      return reply.code(401).send({ error: "invalid_token" });
    }
  });

  // Test-only session seam, inert outside development/test. Lets E2E seed a
  // valid pending OIDC state so the app's real deep-link exchange succeeds
  // without a browser round-trip. Allowlisted by NODE_ENV so it can never
  // appear in production or staging.
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
    app.post("/auth/test/session", async (_req, reply) => {
      const state = "e2e-state";
      pending.set(state, {
        codeVerifier: "e2e-verifier",
        provider: "email",
        createdAt: Date.now(),
      });
      return reply.send({ state, code: "e2e-code" });
    });
  }
}