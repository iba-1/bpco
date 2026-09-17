import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { i18n } from "../../i18n";
import { useOnboardingStore } from "../../onboarding/context.tsx";
import { useAppState } from "../../app-state";
import type { ReminderPreferences } from "../../onboarding/onboarding.ts";

const DEFAULT_TIME = "20:00";

export default function ReminderScreen() {
  const router = useRouter();
  const store = useOnboardingStore();
  const { refreshOnboarding } = useAppState();
  const [checkInEnabled, setCheckInEnabled] = useState(true);
  const [checkInTime, setCheckInTime] = useState(DEFAULT_TIME);
  const [therapyEnabled, setTherapyEnabled] = useState(false);
  const [therapyTime, setTherapyTime] = useState(DEFAULT_TIME);

  async function finish() {
    const preferences: ReminderPreferences = {
      checkIn: { type: "check-in", enabled: checkInEnabled, time: checkInTime || DEFAULT_TIME },
      therapy: { type: "therapy", enabled: therapyEnabled, time: therapyTime || DEFAULT_TIME },
    };
    await store.saveReminderPreferences(preferences);
    await store.complete();
    await refreshOnboarding();
    router.replace("/");
  }

  async function skip() {
    const preferences: ReminderPreferences = {
      checkIn: { type: "check-in", enabled: false, time: DEFAULT_TIME },
      therapy: { type: "therapy", enabled: false, time: DEFAULT_TIME },
    };
    await store.saveReminderPreferences(preferences);
    await store.complete();
    await refreshOnboarding();
    router.replace("/");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{i18n.t("onboarding.reminder.title")}</Text>

      <View style={styles.block}>
        <Text style={styles.question}>{i18n.t("onboarding.reminder.checkin.question")}</Text>
        <Pressable
          style={[styles.toggle, checkInEnabled && styles.toggleOn]}
          onPress={() => setCheckInEnabled((v) => !v)}
        >
          <Text style={[styles.toggleText, checkInEnabled && styles.toggleTextOn]}>
            {i18n.t(
              checkInEnabled
                ? "onboarding.reminder.checkin.consent"
                : "onboarding.reminder.option.no",
            )}
          </Text>
        </Pressable>
        {checkInEnabled && (
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>{i18n.t("onboarding.reminder.time.label")}</Text>
            <TextInput
              style={styles.timeInput}
              value={checkInTime}
              onChangeText={setCheckInTime}
              keyboardType="numbers-and-punctuation"
              testID="checkInTime"
            />
          </View>
        )}
      </View>

      <View style={styles.block}>
        <Text style={styles.question}>{i18n.t("onboarding.reminder.therapy.question")}</Text>
        <Pressable
          style={[styles.toggle, therapyEnabled && styles.toggleOn]}
          onPress={() => setTherapyEnabled((v) => !v)}
        >
          <Text style={[styles.toggleText, therapyEnabled && styles.toggleTextOn]}>
            {i18n.t(
              therapyEnabled
                ? "onboarding.reminder.therapy.consent"
                : "onboarding.reminder.option.no",
            )}
          </Text>
        </Pressable>
        {therapyEnabled && (
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>{i18n.t("onboarding.reminder.time.label")}</Text>
            <TextInput
              style={styles.timeInput}
              value={therapyTime}
              onChangeText={setTherapyTime}
              keyboardType="numbers-and-punctuation"
              testID="therapyTime"
            />
          </View>
        )}
      </View>

      <Pressable style={styles.cta} onPress={() => void finish()}>
        <Text style={styles.ctaText}>{i18n.t("onboarding.reminder.cta.finish")}</Text>
      </Pressable>
      <Pressable style={styles.skip} onPress={() => void skip()}>
        <Text style={styles.skipText}>{i18n.t("onboarding.reminder.cta.skip")}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  block: { marginBottom: 28 },
  question: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  toggle: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  toggleOn: { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" },
  toggleText: { fontSize: 15, color: "#333" },
  toggleTextOn: { color: "#fff", fontWeight: "600" },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 14 },
  timeLabel: { fontSize: 14, color: "#555" },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    width: 96,
  },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  skip: { marginTop: 14, alignItems: "center", padding: 8 },
  skipText: { color: "#0a7ea4", fontSize: 15 },
});