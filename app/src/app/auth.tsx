import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { i18n } from "../i18n";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("onboarding.welcome.title")}</Text>
      <Text style={styles.subtitle}>{i18n.t("onboarding.welcome.subtitle")}</Text>
      <Link href="/account" asChild>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>{i18n.t("onboarding.welcome.cta.start")}</Text>
        </Pressable>
      </Link>
      <Text style={styles.login}>{i18n.t("onboarding.welcome.cta.login")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 32 },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  login: { marginTop: 16, textAlign: "center", color: "#0a7ea4", fontSize: 15 },
});