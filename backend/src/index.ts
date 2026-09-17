import Fastify from "fastify";
import { OidcClient } from "./auth/oidc.ts";
import { registerAuthRoutes } from "./auth/routes.ts";
import { health } from "./health.ts";

export interface ServerEnv {
  PORT?: string;
  VERNE_GATE_BASE_URL?: string;
  VERNE_GATE_CLIENT_ID?: string;
  SESSION_SECRET?: string;
  SESSION_TTL_SECONDS?: string;
  REDIRECT_URI?: string;
}

export function buildServer(env: ServerEnv = process.env) {
  const app = Fastify({ logger: true });

  app.get("/health", async () => health());

  const baseUrl = env.VERNE_GATE_BASE_URL;
  const clientId = env.VERNE_GATE_CLIENT_ID;
  if (!baseUrl || !clientId) {
    throw new Error("VERNE_GATE_BASE_URL and VERNE_GATE_CLIENT_ID are required");
  }
  const sessionSecret = env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET is required");
  }

  const oidc = new OidcClient({
    baseUrl,
    clientId,
    redirectUri: env.REDIRECT_URI ?? "bpco://callback",
  });

  registerAuthRoutes(app, {
    oidc,
    sessionSecret,
    sessionTtlSeconds: Number(env.SESSION_TTL_SECONDS ?? "604800"),
  });

  return app;
}

// Only listen when run directly as the entrypoint, not when imported by tests.
const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  const port = Number(process.env.PORT ?? "3000");
  buildServer()
    .listen({ host: "0.0.0.0", port })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}