import { test } from "node:test";
import assert from "node:assert/strict";
import { createSessionStore, type SessionStorage } from "./session.ts";

function memoryStorage(): SessionStorage {
  const map = new Map<string, string>();
  return {
    async getItem(key) {
      return map.get(key) ?? null;
    },
    async setItem(key, value) {
      map.set(key, value);
    },
    async removeItem(key) {
      map.delete(key);
    },
  };
}

test("save stores the session token", async () => {
  const store = createSessionStore({ storage: memoryStorage() });
  await store.save("token-123");
  assert.equal(await store.get(), "token-123");
});

test("get returns null when no session is stored", async () => {
  const store = createSessionStore({ storage: memoryStorage() });
  assert.equal(await store.get(), null);
});

test("clear removes the session token", async () => {
  const store = createSessionStore({ storage: memoryStorage() });
  await store.save("token-123");
  await store.clear();
  assert.equal(await store.get(), null);
});

test("isAuthenticated reflects a stored session", async () => {
  const store = createSessionStore({ storage: memoryStorage() });
  assert.equal(await store.isAuthenticated(), false);
  await store.save("token-123");
  assert.equal(await store.isAuthenticated(), true);
});

test("isAuthenticated treats an empty-string token as not authenticated", async () => {
  const store = createSessionStore({ storage: memoryStorage() });
  await store.save("");
  assert.equal(await store.isAuthenticated(), false);
});