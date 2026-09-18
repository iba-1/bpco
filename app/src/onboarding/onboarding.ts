export interface OnboardingStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export type Sex = "female" | "male";

export type SmokerStatus = "smoker" | "ex-smoker" | "never-smoker";

export interface Profile {
  birthYear: number;
  sex?: Sex;
  confirmedBpcoDiagnosis: boolean;
  oxygenTherapy: boolean;
  smokerStatus: SmokerStatus;
}

export type TherapySlot = "morning" | "afternoon" | "evening";

export interface Therapy {
  drug: string;
  dose: string;
  slots: TherapySlot[];
}

export type ReminderType = "check-in" | "therapy";

export interface ReminderPreference {
  type: ReminderType;
  enabled: boolean;
  time: string;
}

export interface ReminderPreferences {
  checkIn: ReminderPreference;
  therapy: ReminderPreference;
}

export interface OnboardingStore {
  isCompleted(): Promise<boolean>;
  complete(): Promise<void>;
  getProfile(): Promise<Profile | null>;
  saveProfile(profile: Profile): Promise<void>;
  getTherapy(): Promise<Therapy | null>;
  saveTherapy(therapy: Therapy): Promise<void>;
  getReminderPreferences(): Promise<ReminderPreferences | null>;
  saveReminderPreferences(preferences: ReminderPreferences): Promise<void>;
  clear(): Promise<void>;
}

const ONBOARDING_COMPLETED_KEY = "bpco.onboarding.completed";
const ONBOARDING_PROFILE_KEY = "bpco.onboarding.profile";
const ONBOARDING_THERAPY_KEY = "bpco.onboarding.therapy";
const ONBOARDING_REMINDERS_KEY = "bpco.onboarding.reminders";

async function readJson<T>(storage: OnboardingStorage, key: string): Promise<T | null> {
  const raw = await storage.getItem(key);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as T;
  } catch {
    return null;
  }
}

export function createOnboardingStore(options: {
  storage: OnboardingStorage;
}): OnboardingStore {
  async function isCompleted(): Promise<boolean> {
    const raw = await options.storage.getItem(ONBOARDING_COMPLETED_KEY);
    return raw === "true";
  }

  async function complete(): Promise<void> {
    await options.storage.setItem(ONBOARDING_COMPLETED_KEY, "true");
  }

  async function getProfile(): Promise<Profile | null> {
    return readJson<Profile>(options.storage, ONBOARDING_PROFILE_KEY);
  }

  async function saveProfile(profile: Profile): Promise<void> {
    await options.storage.setItem(ONBOARDING_PROFILE_KEY, JSON.stringify(profile));
  }

  async function getTherapy(): Promise<Therapy | null> {
    return readJson<Therapy>(options.storage, ONBOARDING_THERAPY_KEY);
  }

  async function saveTherapy(therapy: Therapy): Promise<void> {
    await options.storage.setItem(ONBOARDING_THERAPY_KEY, JSON.stringify(therapy));
  }

  async function getReminderPreferences(): Promise<ReminderPreferences | null> {
    return readJson<ReminderPreferences>(options.storage, ONBOARDING_REMINDERS_KEY);
  }

  async function saveReminderPreferences(preferences: ReminderPreferences): Promise<void> {
    await options.storage.setItem(ONBOARDING_REMINDERS_KEY, JSON.stringify(preferences));
  }

  async function clear(): Promise<void> {
    await options.storage.removeItem(ONBOARDING_COMPLETED_KEY);
    await options.storage.removeItem(ONBOARDING_PROFILE_KEY);
    await options.storage.removeItem(ONBOARDING_THERAPY_KEY);
    await options.storage.removeItem(ONBOARDING_REMINDERS_KEY);
  }

  return {
    isCompleted,
    complete,
    getProfile,
    saveProfile,
    getTherapy,
    saveTherapy,
    getReminderPreferences,
    saveReminderPreferences,
    clear,
  };
}