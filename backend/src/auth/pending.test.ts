import { test } from "node:test";
import assert from "node:assert/strict";
import { createPendingStore, PendingAuth } from "./pending.ts";

test("pending store round-trips a request by state", () => {
  const store = createPendingStore();
  const entry: PendingAuth = {
    codeVerifier: "verifier",
    provider: "email",
    createdAt: Date.now(),
  };
  store.set("state-1", entry);
  assert.deepEqual(store.get("state-1"), entry);
  assert.equal(store.get("state-unknown"), null);
});

test("pending store deletes a consumed request", () => {
  const store = createPendingStore();
  store.set("state-1", { codeVerifier: "v", provider: "email", createdAt: Date.now() });
  assert.ok(store.get("state-1"));
  store.delete("state-1");
  assert.equal(store.get("state-1"), null);
});

test("pending store rejects an expired request", () => {
  const store = createPendingStore();
  store.set("state-1", { codeVerifier: "v", provider: "email", createdAt: Date.now() - 700_000 });
  assert.equal(store.get("state-1"), null);
});