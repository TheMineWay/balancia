import { LocaleContent, LocaleKey } from "@i18n/locales/locales.ts";
import { useLanguageContext } from "@providers/core/language/language.provider";

export const useTranslation = (locale: Readonly<LocaleKey>) => {
  const { translations } = useLanguageContext();

  const t = () => translations?.[locale] as LocaleContent<typeof locale>;

  return {
    t,
  };
};
