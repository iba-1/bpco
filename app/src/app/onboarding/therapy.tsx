import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { i18n } from "../../i18n";
import { useOnboardingStore } from "../../onboarding/context.ts";
import type { TherapySlot } from "../../onboarding/onboarding.ts";

const slots: TherapySlot[] = ["morning", "afternoon", "evening"];

export default function TherapyScreen() {
  const router = useRouter();
  const store = useOnboardingStore();
  const [drug, setDrug] = useState("");
  const [dose, setDose] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<TherapySlot[]>([]);

  function toggleSlot(slot: TherapySlot) {
    setSelectedSlots((current) =>
      current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot],
    );
  }

  async function handleContinue() {
    await store.saveTherapy({
      drug: drug.trim(),
      dose: dose.trim(),
      slots: selectedSlots,
    });
    router.push("/onboarding/reminder");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{i18n.t("onboarding.therapy.title")}</Text>
      <Text style={styles.subtitle}>{i18n.t("onboarding.therapy.subtitle")}</Text>

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.therapy.drug.label")}</Text>
      <TextInput
        style={styles.input}
        value={drug}
        onChangeText={setDrug}
        placeholder={i18n.t("onboarding.therapy.drug.placeholder")}
      />

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.therapy.dose.label")}</Text>
      <TextInput
        style={styles.input}
        value={dose}
        onChangeText={setDose}
        placeholder={i18n.t("onboarding.therapy.dose.placeholder")}
      />

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.therapy.slot.title")}</Text>
      <View style={styles.slotsRow}>
        {slots.map((slot) => (
          <Pressable
            key={slot}
            style={[styles.slot, selectedSlots.includes(slot) && styles.slotSelected]}
            onPress={() => toggleSlot(slot)}
          >
            <Text style={[styles.slotText, selectedSlots.includes(slot) && styles.slotTextSelected]}>
              {i18n.t(`onboarding.therapy.slot.${slot}`)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.cta} onPress={() => void handleContinue()}>
        <Text style={styles.ctaText}>{i18n.t("onboarding.therapy.cta.continue")}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#555", marginBottom: 24 },
  fieldLabel: { fontSize: 15, fontWeight: "600", marginTop: 20, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  slotsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  slot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  slotSelected: { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" },
  slotText: { fontSize: 15, color: "#333" },
  slotTextSelected: { color: "#fff", fontWeight: "600" },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});