import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { i18n } from "../../i18n";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("home.checkin.title")}</Text>
      <Link href="/checkin" asChild>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>{i18n.t("home.checkin.cta")}</Text>
          <Text style={styles.ctaHint}>{i18n.t("home.checkin.duration")}</Text>
        </Pressable>
      </Link>
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>{i18n.t("home.empty.title")}</Text>
        <Text style={styles.emptyBody}>{i18n.t("home.empty.body")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 16 },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  ctaHint: { color: "#dceff5", fontSize: 13, marginTop: 4 },
  empty: { marginTop: 32, alignItems: "center" },
  emptyTitle: { fontSize: 16, fontWeight: "600" },
  emptyBody: { fontSize: 14, color: "#666", marginTop: 4, textAlign: "center" },
});