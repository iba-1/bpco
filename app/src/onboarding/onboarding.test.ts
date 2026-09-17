import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createOnboardingStore,
  type OnboardingStorage,
  type Profile,
  type Therapy,
  type ReminderPreferences,
} from "./onboarding.ts";

function storageWithMap(): { storage: OnboardingStorage; map: Map<string, string> } {
  const map = new Map<string, string>();
  return {
    map,
    storage: {
      async getItem(key) {
        return map.get(key) ?? null;
      },
      async setItem(key, value) {
        map.set(key, value);
      },
      async removeItem(key) {
        map.delete(key);
      },
    },
  };
}

const profile: Profile = {
  birthYear: 1955,
  confirmedBpcoDiagnosis: true,
  oxygenTherapy: true,
  smokerStatus: "ex-smoker",
};

const profileWithSex: Profile = {
  ...profile,
  sex: "female",
};

const therapy: Therapy = {
  drug: "Trelegy Ellipta",
  dose: "1 inalazione",
  slots: ["morning", "evening"],
};

const reminderPreferences: ReminderPreferences = {
  checkIn: { type: "check-in", enabled: true, time: "20:00" },
  therapy: { type: "therapy", enabled: false, time: "20:00" },
};

test("onboarding is not completed initially", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  assert.equal(await store.isCompleted(), false);
});

test("complete marks onboarding as completed", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.complete();
  assert.equal(await store.isCompleted(), true);
});

test("saveProfile stores and getProfile returns the profile", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.saveProfile(profile);
  assert.deepEqual(await store.getProfile(), profile);
});

test("saveProfile preserves the optional sex field", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.saveProfile(profileWithSex);
  assert.deepEqual(await store.getProfile(), profileWithSex);
});

test("getProfile returns null when no profile is stored", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  assert.equal(await store.getProfile(), null);
});

test("getProfile returns null when stored data is malformed", async () => {
  const { storage, map } = storageWithMap();
  const store = createOnboardingStore({ storage });
  map.set("bpco.onboarding.profile", "{not json");
  assert.equal(await store.getProfile(), null);
});

test("saveTherapy stores and getTherapy returns the therapy", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.saveTherapy(therapy);
  assert.deepEqual(await store.getTherapy(), therapy);
});

test("getTherapy returns null when no therapy is stored", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  assert.equal(await store.getTherapy(), null);
});

test("saveReminderPreferences stores and getReminderPreferences returns them", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.saveReminderPreferences(reminderPreferences);
  assert.deepEqual(await store.getReminderPreferences(), reminderPreferences);
});

test("getReminderPreferences returns null when none are stored", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  assert.equal(await store.getReminderPreferences(), null);
});

test("clear removes completion flag and all payloads", async () => {
  const store = createOnboardingStore({ storage: storageWithMap().storage });
  await store.saveProfile(profile);
  await store.saveTherapy(therapy);
  await store.saveReminderPreferences(reminderPreferences);
  await store.complete();
  await store.clear();
  assert.equal(await store.isCompleted(), false);
  assert.equal(await store.getProfile(), null);
  assert.equal(await store.getTherapy(), null);
  assert.equal(await store.getReminderPreferences(), null);
});