import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Linking from "expo-linking";
import { createSessionStore, type SessionStore } from "../auth/session";
import { createAuthClient, type AuthClient } from "../auth/client";

export interface AppDeps {
  session: SessionStore;
  auth: AuthClient;
  callbackUrl: string;
}

// In-memory storage for the skeleton; SecureStore arrives with the native
// build (T03 verification on-device). Keeps the logic testable and running
// in any JS environment.
const store = new Map<string, string>();

const defaultDeps: AppDeps = {
  session: createSessionStore({
    storage: {
      async getItem(key: string) {
        return store.get(key) ?? null;
      },
      async setItem(key: string, value: string) {
        store.set(key, value);
      },
      async removeItem(key: string) {
        store.delete(key);
      },
    },
  }),
  auth: createAuthClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
  }),
  callbackUrl: "bpco://callback",
};

export default function RootLayout() {
  const [deps] = useState<AppDeps>(defaultDeps);
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    deps.session.isAuthenticated().then((value) => {
      setAuthenticated(value);
      setReady(true);
    });
  }, [deps]);

  const handleCallback = useCallback(
    async (url: string) => {
      if (!url.startsWith(deps.callbackUrl)) return;
      const parsed = new URL(url);
      const code = parsed.searchParams.get("code");
      const state = parsed.searchParams.get("state");
      if (!code || !state) return;
      try {
        const session = await deps.auth.exchangeCode(code, state);
        await deps.session.save(session);
        setAuthenticated(true);
      } catch {
        // Failed exchange leaves the user on the auth screen.
      }
    },
    [deps],
  );

  useEffect(() => {
    const sub = Linking.addEventListener("url", (event) => {
      void handleCallback(event.url);
    });
    void Linking.getInitialURL().then((url) => {
      if (url) void handleCallback(url);
    });
    return () => sub.remove();
  }, [handleCallback]);

  if (!ready) return null;

  if (!authenticated) {
    return (
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}