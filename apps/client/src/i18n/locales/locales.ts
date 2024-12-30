import { Language } from "@ts-types/base/i18n/language.enum";

const LOCALES = {
  [Language.EN_US]: () => import("./en-us/en-us.locale.ts"),
} as const satisfies Record<string, () => Promise<object>>;

export const getLocale = async (language: Language) => {
  return await LOCALES[language]();
};

// Locales type

export type LocaleKey = keyof Awaited<
  ReturnType<(typeof LOCALES)[Language]>
>["default"];

export type LocaleContent<K extends LocaleKey> = Awaited<
  Awaited<ReturnType<(typeof LOCALES)[Language]>>["default"][K]
>;
