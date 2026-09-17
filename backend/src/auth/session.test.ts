import { test } from "node:test";
import assert from "node:assert/strict";
import { createSession, verifySession } from "./session.ts";

test("createSession signs a JWT with subject, provider and expiry", async () => {
  const secret = "test-secret-32-chars-long-123456";
  const token = await createSession({
    secret,
    subject: "user-1",
    provider: "email",
    ttlSeconds: 3600,
  });
  const parts = token.split(".");
  assert.equal(parts.length, 3);
  const payload = JSON.parse(Buffer.from(parts[1]!, "base64url").toString());
  assert.equal(payload.sub, "user-1");
  assert.equal(payload.provider, "email");
  assert.ok(payload.exp > Math.floor(Date.now() / 1000));
  assert.ok(payload.iat <= Math.floor(Date.now() / 1000));
});

test("verifySession returns the payload for a valid token", async () => {
  const secret = "test-secret-32-chars-long-123456";
  const token = await createSession({ secret, subject: "user-1", provider: "google", ttlSeconds: 3600 });
  const session = await verifySession({ secret, token });
  assert.equal(session.sub, "user-1");
  assert.equal(session.provider, "google");
});

test("verifySession rejects a token signed with a different secret", async () => {
  const token = await createSession({
    secret: "secret-one-32-chars-long-12345",
    subject: "user-1",
    provider: "email",
    ttlSeconds: 3600,
  });
  await assert.rejects(
    () => verifySession({ secret: "secret-two-32-chars-long-54321", token }),
    /signature/i,
  );
});

test("verifySession rejects an expired token", async () => {
  const secret = "test-secret-32-chars-long-123456";
  const token = await createSession({ secret, subject: "user-1", provider: "email", ttlSeconds: -10 });
  await assert.rejects(() => verifySession({ secret, token }), /expired|jwt/i);
});