import { Stack } from "expo-router";
import { AppStateProvider, useAppState } from "../app-state";
import { OnboardingProvider } from "../onboarding/context.tsx";

function Providers({ children }: { children: React.ReactNode }) {
  const { deps } = useAppState();
  return <OnboardingProvider store={deps.onboarding}>{children}</OnboardingProvider>;
}

export default function RootLayout() {
  return (
    <AppStateProvider>
      <Providers>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="callback" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="checkin" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Providers>
    </AppStateProvider>
  );
}