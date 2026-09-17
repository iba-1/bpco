import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import { i18n } from "../i18n";
import { createAuthClient, type Provider } from "../auth/client";

const providers: Provider[] = ["email", "apple", "google"];

const auth = createAuthClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
});

async function startLogin(provider: Provider) {
  try {
    const url = await auth.loginUrl(provider);
    await Linking.openURL(url);
  } catch {
    // Backend unreachable in the skeleton; user stays on this screen.
  }
}

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("onboarding.account.title")}</Text>
      <Text style={styles.label}>{i18n.t("onboarding.account.email")}</Text>
      <Text style={styles.label}>{i18n.t("onboarding.account.password")}</Text>
      <Pressable style={styles.cta} onPress={() => void startLogin("email")}>
        <Text style={styles.ctaText}>{i18n.t("onboarding.account.cta.submit")}</Text>
      </Pressable>
      {providers
        .filter((provider) => provider !== "email")
        .map((provider) => (
          <Pressable
            key={provider}
            style={styles.provider}
            onPress={() => void startLogin(provider)}
          >
            <Text style={styles.providerText}>
              {i18n.t(`onboarding.account.provider.${provider}`)}
            </Text>
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  label: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
  },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  provider: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  providerText: { fontSize: 15 },
});