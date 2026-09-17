import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { i18n } from "../../i18n";

const sections = [
  { title: "onboarding.privacy.what.title", body: "onboarding.privacy.what.body" },
  { title: "onboarding.privacy.why.title", body: "onboarding.privacy.why.body" },
  { title: "onboarding.privacy.who.title", body: "onboarding.privacy.who.body" },
  { title: "onboarding.privacy.retention.title", body: "onboarding.privacy.retention.body" },
  { title: "onboarding.privacy.doctor.title", body: "onboarding.privacy.doctor.body" },
] as const;

export default function PrivacyScreen() {
  const router = useRouter();
  const [legalVisible, setLegalVisible] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{i18n.t("onboarding.privacy.title")}</Text>
      <Text style={styles.summary}>{i18n.t("onboarding.privacy.summary")}</Text>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t(section.title)}</Text>
          <Text style={styles.sectionBody}>{i18n.t(section.body)}</Text>
        </View>
      ))}
      <Pressable style={styles.legalToggle} onPress={() => setLegalVisible((v) => !v)}>
        <Text style={styles.legalToggleText}>{i18n.t("onboarding.privacy.legal.cta.read")}</Text>
      </Pressable>
      {legalVisible && (
        <View style={styles.legal}>
          <Text style={styles.legalTitle}>{i18n.t("onboarding.privacy.legal.title")}</Text>
          <Text style={styles.legalBody}>{i18n.t("onboarding.privacy.legal.body")}</Text>
        </View>
      )}
      <Pressable style={styles.cta} onPress={() => router.push("/onboarding/profile")}>
        <Text style={styles.ctaText}>{i18n.t("onboarding.privacy.cta.accept")}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  summary: { fontSize: 16, color: "#444", marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  sectionBody: { fontSize: 14, color: "#555", lineHeight: 20 },
  legalToggle: { alignSelf: "flex-start", marginBottom: 16 },
  legalToggleText: { color: "#0a7ea4", fontSize: 15, textDecorationLine: "underline" },
  legal: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    marginBottom: 24,
  },
  legalTitle: { fontSize: 15, fontWeight: "600", marginBottom: 8 },
  legalBody: { fontSize: 13, color: "#666", lineHeight: 19 },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});