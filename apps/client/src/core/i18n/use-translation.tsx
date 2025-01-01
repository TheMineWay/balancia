import { LocaleContent, LocaleKey } from "@core/i18n/locales/locales";
import { useLanguageContext } from "@core/providers/language/language.provider";

export const useTranslation = <K extends Readonly<LocaleKey>>(locale: K) => {
  const { translations } = useLanguageContext();

  const t = () => translations?.[locale] as LocaleContent<K>;

  return {
    t,
  };
};
