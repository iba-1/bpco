import { test } from "node:test";
import assert from "node:assert/strict";
import { createAuthClient } from "./client.ts";

function mockFetch(handler: (url: string, init?: RequestInit) => Response) {
  return async (input: string | URL, init?: RequestInit) =>
    handler(String(input), init);
}

test("loginUrl fetches the backend and returns the redirect URL", async () => {
  const client = createAuthClient({
    baseUrl: "http://localhost:3000",
    fetch: mockFetch((url) => {
      assert.equal(url, "http://localhost:3000/auth/login?provider=google");
      return new Response(
        JSON.stringify({ url: "https://gate.example.com/oauth2/auth?x=1" }),
        { status: 200 },
      );
    }),
  });
  const url = await client.loginUrl("google");
  assert.equal(url, "https://gate.example.com/oauth2/auth?x=1");
});

test("exchangeCode posts code and state, returns the session token", async () => {
  const client = createAuthClient({
    baseUrl: "http://localhost:3000",
    fetch: mockFetch((url) => {
      assert.equal(
        url,
        "http://localhost:3000/auth/callback?code=code-1&state=st-1",
      );
      return new Response(JSON.stringify({ session: "jwt-token" }), { status: 200 });
    }),
  });
  const session = await client.exchangeCode("code-1", "st-1");
  assert.equal(session, "jwt-token");
});

test("exchangeCode throws on a non-200 callback", async () => {
  const client = createAuthClient({
    baseUrl: "http://localhost:3000",
    fetch: mockFetch(() => new Response(JSON.stringify({ error: "bad" }), { status: 400 })),
  });
  await assert.rejects(() => client.exchangeCode("code", "state"), /callback/i);
});