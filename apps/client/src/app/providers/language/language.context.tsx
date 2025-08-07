import type { Language } from "@i18n/types/language.enum";
import type { TranslationStore } from "@i18n/types/translation/translation-store.type";
import { createContext, useContext } from "react";

interface LanguageContext {
	language: Language;
	setLanguage: (language: Language) => void;
	translations: TranslationStore;
}

export const languageContext = createContext<LanguageContext>(null!);

export const useLanguageContext = () => {
	const context = useContext(languageContext);

	if (!context)
		throw new Error(
			"Tried to use useLanguageContext outside the LanguageProvider",
		);

	return context;
};
