import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createSessionStore, type SessionStore } from "./auth/session";
import { createAuthClient, type AuthClient } from "./auth/client";
import { createOnboardingStore, type OnboardingStore } from "./onboarding/onboarding";

export interface AppDeps {
  session: SessionStore;
  auth: AuthClient;
  onboarding: OnboardingStore;
}

export interface AppState {
  ready: boolean;
  authenticated: boolean;
  onboardingCompleted: boolean;
}

interface AppStateContextValue extends AppState {
  deps: AppDeps;
  refreshSession(): Promise<void>;
  refreshOnboarding(): Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

// In-memory storage for the skeleton; SecureStore arrives with the native
// build. Keeps the logic testable and running in any JS environment.
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

function buildDeps(): AppDeps {
  return {
    session: createSessionStore({ storage: memoryStorage }),
    auth: createAuthClient({
      baseUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
    }),
    onboarding: createOnboardingStore({ storage: memoryStorage }),
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const deps = useMemo(buildDeps, []);
  const [authenticated, setAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [ready, setReady] = useState(false);

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

  async function refreshSession(): Promise<void> {
    setAuthenticated(await deps.session.isAuthenticated());
  }

  async function refreshOnboarding(): Promise<void> {
    setOnboardingCompleted(await deps.onboarding.isCompleted());
  }

  const value = useMemo(
    () => ({ ready, authenticated, onboardingCompleted, deps, refreshSession, refreshOnboarding }),
    [ready, authenticated, onboardingCompleted, deps],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return value;
}