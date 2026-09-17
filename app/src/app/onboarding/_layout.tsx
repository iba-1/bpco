import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack initialRouteName="privacy">
      <Stack.Screen name="privacy" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="therapy" options={{ headerShown: false }} />
      <Stack.Screen name="reminder" options={{ headerShown: false }} />
    </Stack>
  );
}