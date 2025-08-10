import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { getLocale, MASTER_LOCALE } from "@i18n/locales/locales";
import type { Language } from "@i18n/types/language.enum";
import type { TranslationStore } from "@i18n/types/translation/translation-store.type";
import { languageContext } from "@providers/language/language.context";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

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
					},
				),
			);
		};

		updateLoadedLocale();
	}, [language]);

	const value = useMemo(
		() => ({
			language,
			setLanguage: (language: Language) => setLanguage(language),
			translations: translations as TranslationStore,
		}),
		[language, translations],
	);

	if (!translations) return null;

	return (
		<languageContext.Provider value={value}>
			{children}
		</languageContext.Provider>
	);
}
