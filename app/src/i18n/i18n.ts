export type Locale = string;

export interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  dictionaries: Record<string, Record<string, string>>;
}

export interface I18n {
  t(key: string, params?: Record<string, string>): string;
  setLocale(locale: string): void;
  getLocale(): string;
}

export function createI18n(config: I18nConfig): I18n {
  let locale = config.locale;

  function t(key: string, params?: Record<string, string>): string {
    const value =
      config.dictionaries[locale]?.[key] ??
      config.dictionaries[config.fallbackLocale]?.[key] ??
      key;
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, (_, name: string) => params[name] ?? `{${name}}`);
  }

  return {
    t,
    setLocale(next: string) {
      locale = next;
    },
    getLocale() {
      return locale;
    },
  };
}