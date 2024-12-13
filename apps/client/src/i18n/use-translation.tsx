import { LocaleContent, LocaleKey } from "@i18n/locales/locales.ts";
import { useLanguageContext } from "@providers/language/language.provider.tsx";

export const useTranslation = (locale: Readonly<LocaleKey>) => {
  const { translations, language } = useLanguageContext();

  const t = () =>
    translations?.[language]?.[locale] as LocaleContent<typeof locale>;

  return {
    t,
  };
};
