export type Provider = "email" | "apple" | "google";

export interface AuthClientOptions {
  baseUrl: string;
  fetch?: (input: string | URL, init?: RequestInit) => Promise<Response>;
}

export interface AuthClient {
  loginUrl(provider: Provider): Promise<string>;
  exchangeCode(code: string, state: string): Promise<string>;
}

export function createAuthClient(options: AuthClientOptions): AuthClient {
  const fetchFn = options.fetch ?? globalThis.fetch.bind(globalThis);

  async function loginUrl(provider: Provider): Promise<string> {
    const res = await fetchFn(`${options.baseUrl}/auth/login?provider=${provider}`);
    if (!res.ok) {
      throw new Error(`auth login failed: HTTP ${res.status}`);
    }
    const body = (await res.json()) as { url: string };
    return body.url;
  }

  async function exchangeCode(code: string, state: string): Promise<string> {
    const res = await fetchFn(
      `${options.baseUrl}/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`,
    );
    if (!res.ok) {
      throw new Error(`auth callback failed: HTTP ${res.status}`);
    }
    const body = (await res.json()) as { session: string };
    return body.session;
  }

  return { loginUrl, exchangeCode };
}