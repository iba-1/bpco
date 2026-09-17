import { createServer } from "node:http";

const DEFAULT_PORT = Number(process.env.OIDC_STUB_PORT ?? "9999");

export interface OidcStubServer {
  close(): Promise<void>;
  port: number;
}

// Minimal fake Verne Gate OIDC server for local development and E2E/CI.
// Serves discovery + token exchange + a redirecting authorization endpoint.
// Reused by both the standalone script and the integration tests.
export function createOidcStubServer(options: { port?: number } = {}): Promise<OidcStubServer> {
  const port = options.port ?? DEFAULT_PORT;

  const discovery = {
    authorization_endpoint: `http://127.0.0.1:${port}/oauth2/auth`,
    token_endpoint: `http://127.0.0.1:${port}/oauth2/token`,
    issuer: `http://127.0.0.1:${port}`,
  };

  const server = createServer((req, res) => {
    if (req.url?.endsWith("/.well-known/openid-configuration")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(discovery));
      return;
    }
    if (req.url?.endsWith("/oauth2/token")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ access_token: "at", id_token: "id", refresh_token: "rt" }));
      return;
    }
    // Authorization endpoint: issue a code and redirect back to the app with
    // the same state the app sent, so the OIDC round-trip completes.
    if (req.url?.startsWith("/oauth2/auth")) {
      const qs = new URLSearchParams(req.url.split("?")[1] ?? "");
      const state = qs.get("state") ?? "stub-state";
      const redirectUri = qs.get("redirect_uri") ?? "bpco://callback";
      const redirect = `${redirectUri}?code=stub-code&state=${state}`;
      res.writeHead(302, { location: redirect });
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });

  server.on("error", (err) => {
    console.error(`OIDC stub error on port ${port}:`, err.message);
  });

  return new Promise<OidcStubServer>((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      resolve({
        close: () => new Promise((ok) => server.close(() => ok())),
        port,
      });
    });
  });
}

// Runnable standalone when invoked directly.
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  createOidcStubServer().then((server) => {
    console.log(`OIDC stub listening on http://127.0.0.1:${server.port}`);
  });
}