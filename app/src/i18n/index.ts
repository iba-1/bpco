import { createI18n, type I18n } from "./i18n.ts";
import { it, en } from "./dictionaries.ts";

export const i18n: I18n = createI18n({
  locale: "it",
  fallbackLocale: "en",
  dictionaries: { it, en },
});