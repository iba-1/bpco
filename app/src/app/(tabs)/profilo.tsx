import { View, Text, StyleSheet } from "react-native";
import { i18n } from "../../i18n";

const sections = [
  "profilo.section.personal",
  "profilo.section.therapy",
  "profilo.section.reminders",
  "profilo.section.privacy",
  "profilo.section.export",
  "profilo.section.delete",
  "profilo.section.support",
] as const;

export default function ProfiloScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("common.tab.profilo")}</Text>
      {sections.map((key) => (
        <View key={key} style={styles.row}>
          <Text style={styles.rowText}>{i18n.t(key)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 16 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: { fontSize: 16 },
});