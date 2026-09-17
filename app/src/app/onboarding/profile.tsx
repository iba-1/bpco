import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { i18n } from "../../i18n";
import { useOnboardingStore } from "../../onboarding/context.tsx";
import type { Profile, Sex, SmokerStatus } from "../../onboarding/onboarding.ts";

const sexOptions: { value: Sex | "undisclosed"; label: string }[] = [
  { value: "female", label: "onboarding.profile.sex.option.female" },
  { value: "male", label: "onboarding.profile.sex.option.male" },
  { value: "undisclosed", label: "onboarding.profile.sex.option.undisclosed" },
];

const smokerOptions: { value: SmokerStatus; label: string }[] = [
  { value: "smoker", label: "onboarding.profile.smoker.option.smoker" },
  { value: "ex-smoker", label: "onboarding.profile.smoker.option.ex" },
  { value: "never-smoker", label: "onboarding.profile.smoker.option.never" },
];

function isValidBirthYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1900 && year <= currentYear;
}

export default function ProfileScreen() {
  const router = useRouter();
  const store = useOnboardingStore();
  const [birthYearText, setBirthYearText] = useState("");
  const [sex, setSex] = useState<Sex | "undisclosed">("undisclosed");
  const [diagnosisConfirmed, setDiagnosisConfirmed] = useState(false);
  const [oxygen, setOxygen] = useState(false);
  const [smokerStatus, setSmokerStatus] = useState<SmokerStatus | undefined>(undefined);

  const birthYear = Number(birthYearText);
  const yearValid = isValidBirthYear(birthYear);
  const canContinue = yearValid && diagnosisConfirmed && smokerStatus !== undefined;

  async function handleContinue() {
    if (!canContinue) return;
    const profile: Profile = {
      birthYear,
      confirmedBpcoDiagnosis: diagnosisConfirmed,
      oxygenTherapy: oxygen,
      smokerStatus: smokerStatus as SmokerStatus,
    };
    if (sex === "female" || sex === "male") {
      profile.sex = sex;
    }
    await store.saveProfile(profile);
    router.push("/onboarding/therapy");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{i18n.t("onboarding.profile.title")}</Text>
      <Text style={styles.subtitle}>{i18n.t("onboarding.profile.subtitle")}</Text>

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.profile.birthyear.label")}</Text>
      <TextInput
        style={styles.input}
        value={birthYearText}
        onChangeText={setBirthYearText}
        placeholder={i18n.t("onboarding.profile.birthyear.placeholder")}
        keyboardType="numeric"
        maxLength={4}
        testID="birthYear"
      />
      {birthYearText.length > 0 && !yearValid && (
        <Text style={styles.error}>{i18n.t("onboarding.profile.birthyear.error")}</Text>
      )}

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.profile.sex.label")}</Text>
      <Text style={styles.hint}>{i18n.t("onboarding.profile.sex.hint")}</Text>
      <View style={styles.optionsRow}>
        {sexOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.option, sex === option.value && styles.optionSelected]}
            onPress={() => setSex(option.value)}
          >
            <Text style={[styles.optionText, sex === option.value && styles.optionTextSelected]}>
              {i18n.t(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.profile.diagnosis.label")}</Text>
      <Pressable style={styles.confirmRow} onPress={() => setDiagnosisConfirmed((v) => !v)}>
        <View style={[styles.checkbox, diagnosisConfirmed && styles.checkboxOn]}>
          {diagnosisConfirmed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.confirmText}>{i18n.t("onboarding.profile.diagnosis.hint")}</Text>
      </Pressable>

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.profile.oxygen.label")}</Text>
      <View style={styles.optionsRow}>
        <Pressable
          style={[styles.option, oxygen && styles.optionSelected]}
          onPress={() => setOxygen(true)}
        >
          <Text style={[styles.optionText, oxygen && styles.optionTextSelected]}>
            {i18n.t("onboarding.profile.oxygen.yes")}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.option, !oxygen && styles.optionSelected]}
          onPress={() => setOxygen(false)}
        >
          <Text style={[styles.optionText, !oxygen && styles.optionTextSelected]}>
            {i18n.t("onboarding.profile.oxygen.no")}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.fieldLabel}>{i18n.t("onboarding.profile.smoker.label")}</Text>
      <View style={styles.optionsRow}>
        {smokerOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.option, smokerStatus === option.value && styles.optionSelected]}
            onPress={() => setSmokerStatus(option.value)}
          >
            <Text
              style={[styles.optionText, smokerStatus === option.value && styles.optionTextSelected]}
            >
              {i18n.t(option.label)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.cta, !canContinue && styles.ctaDisabled]}
        disabled={!canContinue}
        onPress={() => void handleContinue()}
      >
        <Text style={styles.ctaText}>{i18n.t("onboarding.profile.cta.continue")}</Text>
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
  hint: { fontSize: 13, color: "#777", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  error: { color: "#b3261e", fontSize: 13, marginTop: 6 },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionSelected: { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" },
  optionText: { fontSize: 14, color: "#333" },
  optionTextSelected: { color: "#fff", fontWeight: "600" },
  confirmRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" },
  checkmark: { color: "#fff", fontSize: 15, fontWeight: "700" },
  confirmText: { fontSize: 15, flex: 1 },
  cta: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  ctaDisabled: { backgroundColor: "#9fc3d1" },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});