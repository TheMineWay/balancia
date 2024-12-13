import { Language } from "@ts-types/base/i18n/language.enum";

const LOCALES = {
  [Language.EN_US]: {
    common: import("./en-us/common.json"),
  },
} as const satisfies Record<Language, Record<string, object>>;

export const getLocale = async (language: Language, locale: LocaleKey) => {
  return await LOCALES[language][locale];
};

// Locales type

export type LocaleKey = keyof (typeof LOCALES)[Language];
export type LocaleContent<K extends LocaleKey> = Awaited<
  (typeof LOCALES)[Language][K]
>;
