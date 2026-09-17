import { Tabs } from "expo-router";
import { i18n } from "../../i18n";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: i18n.t("common.tab.home") }}
      />
      <Tabs.Screen
        name="storico"
        options={{ title: i18n.t("common.tab.storico") }}
      />
      <Tabs.Screen
        name="report"
        options={{ title: i18n.t("common.tab.report") }}
      />
      <Tabs.Screen
        name="profilo"
        options={{ title: i18n.t("common.tab.profilo") }}
      />
    </Tabs>
  );
}