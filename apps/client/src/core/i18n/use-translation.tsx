import { useLanguageContext } from "@core/providers/language/language.provider";
import { LocaleContent, LocaleKey } from "@i18n/locales/locales";

export const useTranslation = <K extends Readonly<LocaleKey>>(locale: K) => {
  const { translations } = useLanguageContext();

  const t = () => translations?.[locale] as LocaleContent<K>;

  return {
    t,
  };
};
