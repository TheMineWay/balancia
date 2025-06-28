import type { LocaleContent, LocaleKey } from "@i18n/locales/locales";
import { useLanguageContext } from "@providers/language/language.context";
import { interpolate } from "@shared/utils";

export const useTranslation = <K extends Readonly<LocaleKey>>(locale: K) => {
  const { translations } = useLanguageContext();

  const t = () => translations?.[locale] as LocaleContent<K>;

  const interpolated = (
    getTextFn: (tInfo: ReturnType<typeof t>) => string,
    vars?: Parameters<typeof interpolate>[1]
  ) => interpolate(getTextFn(t()), vars);

  return {
    t,
    interpolate,
    interpolated,
  };
};
