import { test } from "node:test";
import assert from "node:assert/strict";
import { OidcClient } from "./oidc.ts";

const discovery = {
  authorization_endpoint: "https://gate.example.com/oauth2/auth",
  token_endpoint: "https://gate.example.com/oauth2/token",
  issuer: "https://gate.example.com",
};

function mockFetch(handler: (url: string, init?: RequestInit) => Response) {
  return async (input: string | URL, init?: RequestInit) =>
    handler(String(input), init);
}

test("discover loads endpoints from well-known config", async () => {
  const client = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: mockFetch(() => new Response(JSON.stringify(discovery), { status: 200 })),
  });
  await client.discover();
  assert.equal(client.authorizationEndpoint, discovery.authorization_endpoint);
  assert.equal(client.tokenEndpoint, discovery.token_endpoint);
});

test("discover rejects non-200 discovery response", async () => {
  const client = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: mockFetch(() => new Response("nope", { status: 500 })),
  });
  await assert.rejects(() => client.discover(), /discovery/i);
});

test("authUrl builds authorization URL with PKCE challenge and state", async () => {
  const client = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: mockFetch(() => new Response(JSON.stringify(discovery), { status: 200 })),
  });
  await client.discover();
  const url = client.authUrl({ state: "xyz", codeChallenge: "challenge", provider: "email" });
  const parsed = new URL(url);
  assert.equal(parsed.origin + parsed.pathname, discovery.authorization_endpoint);
  assert.equal(parsed.searchParams.get("client_id"), "app");
  assert.equal(parsed.searchParams.get("response_type"), "code");
  assert.equal(parsed.searchParams.get("redirect_uri"), "bpco://callback");
  assert.equal(parsed.searchParams.get("state"), "xyz");
  assert.equal(parsed.searchParams.get("code_challenge"), "challenge");
  assert.equal(parsed.searchParams.get("code_challenge_method"), "S256");
  assert.equal(parsed.searchParams.get("scope"), "openid email profile");
  assert.equal(parsed.searchParams.get("provider"), "email");
});

test("exchangeCode posts code and verifier, returns tokens", async () => {
  const client = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: mockFetch((url, init) => {
      if (url === "https://gate.example.com/.well-known/openid-configuration") {
        return new Response(JSON.stringify(discovery), { status: 200 });
      }
      assert.equal(url, discovery.token_endpoint);
      const body = new URLSearchParams(String(init?.body));
      assert.equal(body.get("grant_type"), "authorization_code");
      assert.equal(body.get("code"), "code-1");
      assert.equal(body.get("code_verifier"), "verifier-1");
      assert.equal(body.get("client_id"), "app");
      return new Response(
        JSON.stringify({ access_token: "at", id_token: "id", refresh_token: "rt" }),
        { status: 200 },
      );
    }),
  });
  await client.discover();
  const tokens = await client.exchangeCode({ code: "code-1", codeVerifier: "verifier-1" });
  assert.equal(tokens.access_token, "at");
  assert.equal(tokens.id_token, "id");
  assert.equal(tokens.refresh_token, "rt");
});

test("exchangeCode rejects non-200 token response", async () => {
  const client = new OidcClient({
    baseUrl: "https://gate.example.com",
    clientId: "app",
    redirectUri: "bpco://callback",
    fetch: mockFetch((url) => {
      if (url === "https://gate.example.com/.well-known/openid-configuration") {
        return new Response(JSON.stringify(discovery), { status: 200 });
      }
      return new Response("error", { status: 400 });
    }),
  });
  await client.discover();
  await assert.rejects(
    () => client.exchangeCode({ code: "code", codeVerifier: "verifier" }),
    /token exchange/i,
  );
});