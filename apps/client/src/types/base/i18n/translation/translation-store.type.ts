import { LocaleKey } from "@i18n/locales/locales.ts";
import { Language } from "@ts-types/base/i18n/language.enum.ts";

export type TranslationStore = Partial<
  Record<Language, Partial<Record<LocaleKey, object>>>
>;
