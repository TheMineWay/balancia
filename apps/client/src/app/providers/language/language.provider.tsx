import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { getLocale, MASTER_LOCALE } from "@i18n/locales/locales";
import type { Language } from "@i18n/types/language.enum";
import type { TranslationStore } from "@i18n/types/translation/translation-store.type";
import { useLocalConfig } from "@providers/config/local-config.context";
import { languageContext } from "@providers/language/language.context";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = WithChildren;

export const LanguageProvider: FC<Props> = ({ children }) => {
	const [translations, setTranslations] = useState<TranslationStore>();
	const { config, setConfig } = useLocalConfig();

	const { language } = config;

	const setLanguage = useCallback(
		(newLang: Language) => {
			setConfig({ ...config, language: newLang });
		},
		[config, setConfig],
	);

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
		[language, translations, setLanguage],
	);

	if (!translations) return null;

	return (
		<languageContext.Provider value={value}>
			{children}
		</languageContext.Provider>
	);
};
