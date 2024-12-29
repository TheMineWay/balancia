import { LocaleContent, LocaleKey } from "@i18n/locales/locales.ts";
import { useLanguageContext } from "@providers/core/language/language.provider";

export const useTranslation = <K extends Readonly<LocaleKey>>(locale: K) => {
  const { translations } = useLanguageContext();

  const t = () => translations?.[locale] as LocaleContent<K>;

  return {
    t,
  };
};
