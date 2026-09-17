import { test } from "node:test";
import assert from "node:assert/strict";
import { createI18n, type I18nConfig } from "./i18n.ts";

const dictionaries: I18nConfig["dictionaries"] = {
  it: {
    "onboarding.welcome.title": "Tieni traccia della tua BPCO",
    "onboarding.welcome.cta.start": "Inizia",
    "home.checkin.title": "Come stai oggi?",
    "home.checkin.cta": "Fai il check-in",
    "common.tab.home": "Home",
    "common.tab.storico": "Storico",
    "common.tab.report": "Report",
    "common.tab.profilo": "Profilo",
  },
  en: {
    "onboarding.welcome.title": "Track your COPD",
    "onboarding.welcome.cta.start": "Start",
    "home.checkin.title": "How are you today?",
    "home.checkin.cta": "Do a check-in",
    "common.tab.home": "Home",
    "common.tab.storico": "History",
    "common.tab.report": "Report",
    "common.tab.profilo": "Profile",
  },
};

test("resolves a dotted key for the active locale", () => {
  const i18n = createI18n({ locale: "it", fallbackLocale: "en", dictionaries });
  assert.equal(i18n.t("home.checkin.cta"), "Fai il check-in");
  assert.equal(i18n.t("common.tab.storico"), "Storico");
});

test("falls back to the fallback locale for a missing key", () => {
  const i18n = createI18n({ locale: "it", fallbackLocale: "en", dictionaries });
  assert.equal(i18n.t("onboarding.welcome.cta.start"), "Inizia"); // it has it
  // simulate a key missing in `it` but present in `en`
  const missingIt = createI18n({
    locale: "it",
    fallbackLocale: "en",
    dictionaries: {
      it: {},
      en: { "home.checkin.cta": "Do a check-in" },
    },
  });
  assert.equal(missingIt.t("home.checkin.cta"), "Do a check-in");
});

test("returns the key itself when no locale has it", () => {
  const i18n = createI18n({ locale: "it", fallbackLocale: "en", dictionaries });
  assert.equal(i18n.t("does.not.exist"), "does.not.exist");
});

test("supports interpolation of named parameters", () => {
  const i18n = createI18n({
    locale: "it",
    fallbackLocale: "en",
    dictionaries: {
      it: { "home.checkin.streak": "Hai registrato {count} giorni" },
      en: {},
    },
  });
  assert.equal(i18n.t("home.checkin.streak", { count: "5" }), "Hai registrato 5 giorni");
});

test("sets the active locale after creation", () => {
  const i18n = createI18n({ locale: "it", fallbackLocale: "en", dictionaries });
  i18n.setLocale("en");
  assert.equal(i18n.t("home.checkin.cta"), "Do a check-in");
});