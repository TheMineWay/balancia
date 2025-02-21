import { Language } from "@ts-types/base/i18n/language.enum";
import { TranslationStore } from "@ts-types/base/i18n/translation/translation-store.type";
import { createContext, useContext } from "react";

interface LanguageContext {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: TranslationStore;
}

export const LANGUAGE_CONTEXT = createContext<LanguageContext>(null!);

export const useLanguageContext = () => {
  const context = useContext(LANGUAGE_CONTEXT);

  if (!context)
    throw new Error(
      "Tried to use useLanguageContext outside the LanguageProvider"
    );

  return context;
};
