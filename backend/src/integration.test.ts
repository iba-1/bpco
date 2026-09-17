import { test } from "node:test";
import assert from "node:assert/strict";
import { buildServer } from "./index.ts";
import { createOidcStubServer } from "./oidc-stub.ts";

test("integration: /health over real HTTP", async (t) => {
  const oidc = await createOidcStubServer({ port: 9991 });
  const app = buildServer({
    VERNE_GATE_BASE_URL: "http://127.0.0.1:9991",
    VERNE_GATE_CLIENT_ID: "test-client",
    SESSION_SECRET: "test-secret-32-chars-long-123456",
    PORT: "3991",
  });
  t.after(async () => {
    await app.close();
    await oidc.close();
  });
  await app.listen({ host: "127.0.0.1", port: 3991 });
  const res = await fetch("http://127.0.0.1:3991/health");
  assert.equal(res.status, 200);
  const body = (await res.json()) as { status: string };
  assert.equal(body.status, "ok");
});

test("integration: full auth flow over real HTTP", async (t) => {
  const oidc = await createOidcStubServer({ port: 9992 });
  const app = buildServer({
    VERNE_GATE_BASE_URL: "http://127.0.0.1:9992",
    VERNE_GATE_CLIENT_ID: "test-client",
    SESSION_SECRET: "test-secret-32-chars-long-123456",
    PORT: "3992",
  });
  t.after(async () => {
    await app.close();
    await oidc.close();
  });
  await app.listen({ host: "127.0.0.1", port: 3992 });

  // 1. GET /auth/login → authorization URL with state + PKCE
  const login = await fetch("http://127.0.0.1:3992/auth/login?provider=email");
  assert.equal(login.status, 200);
  const { url } = (await login.json()) as { url: string };
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("provider"), "email");
  const state = parsed.searchParams.get("state");
  assert.ok(state);

  // 2. GET /auth/callback with the issued state → session JWT
  const cb = await fetch(
    `http://127.0.0.1:3992/auth/callback?code=code-1&state=${state}`,
  );
  assert.equal(cb.status, 200);
  const { session } = (await cb.json()) as { session: string };
  assert.ok(session.split(".").length === 3);

  // 3. GET /auth/me with the session → claims
  const me = await fetch(`http://127.0.0.1:3992/auth/me?token=${session}`);
  assert.equal(me.status, 200);
  const claims = (await me.json()) as { sub: string; provider: string };
  assert.equal(claims.sub, state);
  assert.equal(claims.provider, "email");

  // 4. A fresh state is rejected (one-time nonce)
  const bad = await fetch(
    "http://127.0.0.1:3992/auth/callback?code=code-x&state=unknown",
  );
  assert.equal(bad.status, 400);
});