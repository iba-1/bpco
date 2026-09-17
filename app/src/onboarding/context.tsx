import { createContext, useContext, type ReactNode } from "react";
import type { OnboardingStore } from "./onboarding.ts";

const OnboardingContext = createContext<OnboardingStore | null>(null);

export function OnboardingProvider(props: {
  store: OnboardingStore;
  children: ReactNode;
}) {
  return (
    <OnboardingContext.Provider value={props.store}>
      {props.children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingStore(): OnboardingStore {
  const store = useContext(OnboardingContext);
  if (!store) {
    throw new Error("useOnboardingStore must be used within an OnboardingProvider");
  }
  return store;
}