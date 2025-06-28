import { Language } from "@i18n/types/language.enum.ts";

export const MASTER_LOCALE = Language.EN_US;

const LOCALES = {
  [Language.EN_US]: () => import("./en-us/locale.ts"),
} as const satisfies Record<string, () => Promise<object>>;

export const getLocale = async (language: Language) => {
  return await LOCALES[language]();
};

// Locales type

export type LocaleKey = keyof Awaited<
  ReturnType<(typeof LOCALES)[Language]>
>["default"];

export type LocaleContent<K extends LocaleKey> = Awaited<
  Awaited<ReturnType<(typeof LOCALES)[typeof MASTER_LOCALE]>>["default"][K]
>;
