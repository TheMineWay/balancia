import { getLocale, LocaleKey } from "@i18n/locales/locales.ts";
import { Language } from "@ts-types/base/i18n/language.enum";
import { TranslationStore } from "@ts-types/base/i18n/translation/translation-store.type.ts";
import { WithChildren } from "@ts-types/common/component.types.ts";
import { createContext, useContext, useState } from "react";

const CONTEXT = createContext<LanguageContext>(null!);
const DEFAULT_LANGUAGE = Language.EN_US;

type Props = WithChildren;

export default function LanguageProvider({ children }: Readonly<Props>) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<TranslationStore>({});

  const addTranslation = async (locale: LocaleKey) => {
    setTranslations({
      ...translations,
      [language]: {
        ...translations?.[language],
        [locale]: await getLocale(language, locale),
      },
    });
  };

  return (
    <CONTEXT.Provider
      value={{
        language,
        setLanguage,
        translations,
        addTranslation,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(CONTEXT);

  if (!context)
    throw new Error(
      "Tried to use useLanguageContext outside the LanguageProvider"
    );

  return context;
};

interface LanguageContext {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: TranslationStore;
  addTranslation: (locale: LocaleKey) => Promise<void>;
}
