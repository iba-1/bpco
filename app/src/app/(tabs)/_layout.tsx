import { Tabs } from "expo-router";
import { i18n } from "../../i18n";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: i18n.t("common.tab.home"), tabBarButtonTestID: "tab-home" }}
      />
      <Tabs.Screen
        name="storico"
        options={{ title: i18n.t("common.tab.storico"), tabBarButtonTestID: "tab-storico" }}
      />
      <Tabs.Screen
        name="report"
        options={{ title: i18n.t("common.tab.report"), tabBarButtonTestID: "tab-report" }}
      />
      <Tabs.Screen
        name="profilo"
        options={{ title: i18n.t("common.tab.profilo"), tabBarButtonTestID: "tab-profilo" }}
      />
    </Tabs>
  );
}