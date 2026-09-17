import { Redirect } from "expo-router";
import { useAppState } from "../app-state";

export default function Index() {
  const { ready, authenticated, onboardingCompleted } = useAppState();

  if (!ready) return null;

  if (!authenticated) {
    return <Redirect href="/auth" />;
  }
  if (!onboardingCompleted) {
    return <Redirect href="/onboarding/privacy" />;
  }
  return <Redirect href="/(tabs)" />;
}