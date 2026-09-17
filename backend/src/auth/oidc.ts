export type FetchFn = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export interface OidcConfig {
  baseUrl: string;
  clientId: string;
  redirectUri: string;
  fetch?: FetchFn;
}

export interface Discovery {
  authorization_endpoint: string;
  token_endpoint: string;
  issuer: string;
}

export interface AuthUrlParams {
  state: string;
  codeChallenge: string;
  provider?: string;
}

export interface ExchangeParams {
  code: string;
  codeVerifier: string;
}

export interface Tokens {
  access_token: string;
  id_token: string;
  refresh_token?: string;
}

export class OidcClient {
  readonly config: OidcConfig;
  readonly fetch: FetchFn;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;

  constructor(config: OidcConfig) {
    this.config = config;
    this.fetch =
      config.fetch ?? ((input, init) => globalThis.fetch(input, init));
  }

  async discover(): Promise<Discovery> {
    const res = await this.fetch(
      `${this.config.baseUrl}/.well-known/openid-configuration`,
    );
    if (!res.ok) {
      throw new Error(`OIDC discovery failed: HTTP ${res.status}`);
    }
    const discovery = (await res.json()) as Discovery;
    this.authorizationEndpoint = discovery.authorization_endpoint;
    this.tokenEndpoint = discovery.token_endpoint;
    return discovery;
  }

  authUrl(params: AuthUrlParams): string {
    const url = new URL(this.authorizationEndpoint!);
    url.searchParams.set("client_id", this.config.clientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", this.config.redirectUri);
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("state", params.state);
    url.searchParams.set("code_challenge", params.codeChallenge);
    url.searchParams.set("code_challenge_method", "S256");
    if (params.provider) {
      url.searchParams.set("provider", params.provider);
    }
    return url.toString();
  }

  async exchangeCode(params: ExchangeParams): Promise<Tokens> {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      code_verifier: params.codeVerifier,
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
    });
    const res = await this.fetch(this.tokenEndpoint!, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) {
      throw new Error(`OIDC token exchange failed: HTTP ${res.status}`);
    }
    return (await res.json()) as Tokens;
  }
}

function base64UrlEncode(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeVerifier(): string {
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64UrlEncode(new Uint8Array(digest));
}

export function generateState(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}