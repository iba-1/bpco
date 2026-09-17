import { useCallback, useEffect, useState } from "react";
import { Stack, useSegments } from "expo-router";
import * as Linking from "expo-linking";
import { createSessionStore, type SessionStore } from "../auth/session";
import { createAuthClient, type AuthClient } from "../auth/client";
import { createOnboardingStore, type OnboardingStore } from "../onboarding/onboarding";
import { OnboardingProvider } from "../onboarding/context";

export interface AppDeps {
  session: SessionStore;
  auth: AuthClient;
  onboarding: OnboardingStore;
  callbackUrl: string;
}

// In-memory storage for the skeleton; SecureStore arrives with the native
// build (T03 verification on-device). Keeps the logic testable and running
// in any JS environment.
const store = new Map<string, string>();

const memoryStorage = {
  async getItem(key: string) {
    return store.get(key) ?? null;
  },
  async setItem(key: string, value: string) {
    store.set(key, value);
  },
  async removeItem(key: string) {
    store.delete(key);
  },
};

const defaultDeps: AppDeps = {
  session: createSessionStore({ storage: memoryStorage }),
  auth: createAuthClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
  }),
  onboarding: createOnboardingStore({ storage: memoryStorage }),
  callbackUrl: "bpco://callback",
};

export default function RootLayout() {
  const [deps] = useState<AppDeps>(defaultDeps);
  const [authenticated, setAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [ready, setReady] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    void (async () => {
      const isAuthenticated = await deps.session.isAuthenticated();
      setAuthenticated(isAuthenticated);
      setOnboardingCompleted(
        isAuthenticated ? await deps.onboarding.isCompleted() : false,
      );
      setReady(true);
    })();
  }, [deps]);

  // Re-check the completion flag after navigation: completing onboarding
  // redirects to the tabs, which flips the gate from onboarding to tabs.
  useEffect(() => {
    if (!authenticated) return;
    deps.onboarding.isCompleted().then(setOnboardingCompleted);
  }, [deps, authenticated, segments]);

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

  return (
    <OnboardingProvider store={deps.onboarding}>
      {!authenticated ? (
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
        </Stack>
      ) : !onboardingCompleted ? (
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}
    </OnboardingProvider>
  );
}