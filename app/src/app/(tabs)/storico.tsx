import { View, Text, StyleSheet } from "react-native";
import { i18n } from "../../i18n";

export default function StoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("storico.empty.title")}</Text>
      <Text style={styles.body}>{i18n.t("storico.empty.body")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600" },
  body: { fontSize: 14, color: "#666", marginTop: 8, textAlign: "center" },
});