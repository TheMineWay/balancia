import { getLocale, MASTER_LOCALE } from "@i18n/locales/locales";
import type { TranslationStore } from "@i18n/types/translation/translation-store.type";
import { languageContext } from "@providers/language/language.context";
import _ from "lodash";
import { useEffect, useState } from "react";
import type { WithChildren } from "src/common/types/component/component.types";

const DEFAULT_LANGUAGE = MASTER_LOCALE;

type Props = WithChildren;

export default function LanguageProvider({ children }: Readonly<Props>) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<TranslationStore>();

  useEffect(() => {
    const updateLoadedLocale = async () => {
      setTranslations(
        _.defaultsDeep(
          {},
          {
            ...(await getLocale(language)).default,
          },
          {
            ...(await getLocale(MASTER_LOCALE)).default,
          }
        )
      );
    };

    updateLoadedLocale();
  }, [language]);

  if (!translations) return null;

  return (
    <languageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
      }}
    >
      {children}
    </languageContext.Provider>
  );
}
