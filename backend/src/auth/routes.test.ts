import { test } from "node:test";
import assert from "node:assert/strict";
import Fastify from "fastify";
import { OidcClient } from "./oidc.ts";
import { registerAuthRoutes } from "./routes.ts";

const discovery = {
  authorization_endpoint: "https://gate.example.com/oauth2/auth",
  token_endpoint: "https://gate.example.com/oauth2/token",
  issuer: "https://gate.example.com",
};

function buildApp() {
  const app = Fastify();
  const oidc = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: (async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/.well-known/openid-configuration")) {
        return new Response(JSON.stringify(discovery), { status: 200 });
      }
      if (url.endsWith("/oauth2/token")) {
        const body = new URLSearchParams(String(init?.body));
        return new Response(
          JSON.stringify({ access_token: "at", id_token: `id:${body.get("code")}`, refresh_token: "rt" }),
          { status: 200 },
        );
      }
      return new Response("not found", { status: 404 });
    }),
  });
  registerAuthRoutes(app, { oidc, sessionSecret: "test-secret-32-chars-long-123456", sessionTtlSeconds: 3600 });
  return app;
}

test("GET /auth/login returns an authorization URL for email provider", async () => {
  const app = buildApp();
  const res = await app.inject({ method: "GET", url: "/auth/login" });
  assert.equal(res.statusCode, 200);
  const { url } = res.json();
  assert.ok(url.startsWith(discovery.authorization_endpoint));
  assert.ok(url.includes("code_challenge="));
  assert.ok(url.includes("provider=email"));
  await app.close();
});

test("GET /auth/login rejects an unknown provider", async () => {
  const app = buildApp();
  const res = await app.inject({ method: "GET", url: "/auth/login?provider=spid" });
  assert.equal(res.statusCode, 400);
  await app.close();
});

test("GET /auth/callback exchanges code and returns a session", async () => {
  const app = buildApp();
  const login = await app.inject({ method: "GET", url: "/auth/login" });
  const { url } = login.json();
  const state = new URL(url).searchParams.get("state")!;
  const res = await app.inject({
    method: "GET",
    url: `/auth/callback?code=code-1&state=${state}`,
  });
  assert.equal(res.statusCode, 200);
  const { session } = res.json();
  assert.ok(session.split(".").length === 3);
  await app.close();
});

test("GET /auth/callback rejects an unknown state", async () => {
  const app = buildApp();
  const res = await app.inject({
    method: "GET",
    url: "/auth/callback?code=code-1&state=unknown-state",
  });
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "invalid_state");
  await app.close();
});

test("GET /auth/me returns claims for a valid session token", async () => {
  const app = buildApp();
  const login = await app.inject({ method: "GET", url: "/auth/login" });
  const state = new URL(login.json().url).searchParams.get("state")!;
  const cb = await app.inject({
    method: "GET",
    url: `/auth/callback?code=code-1&state=${state}`,
  });
  const { session } = cb.json();
  const res = await app.inject({ method: "GET", url: `/auth/me?token=${session}` });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().sub, state);
  assert.equal(res.json().provider, "email");
  await app.close();
});

test("GET /auth/me rejects an invalid token", async () => {
  const app = buildApp();
  const res = await app.inject({ method: "GET", url: "/auth/me?token=not-a-jwt" });
  assert.equal(res.statusCode, 401);
  await app.close();
});