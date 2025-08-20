import { LANGUAGES } from "@i18n/languages-list.constant";
import type { Language } from "@i18n/types/language.enum";
import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { Combobox, InputBase, Text, useCombobox } from "@mantine/core";
import { useLanguageContext } from "@providers/language/language.context";
import { useCallback, useMemo } from "react";

type Props = {
	id?: string;
};

export const LanguageChanger: FC<Props> = ({ id }) => {
	const { t } = useTranslation("common");
	const combobox = useCombobox();
	const { language, setLanguage } = useLanguageContext();

	const options = useMemo(() => {
		return LANGUAGES.map((language) => (
			<Option t={t} key={language} language={language} />
		));
	}, [t]);

	const onChange = useCallback(
		(lang: string | null) => {
			setLanguage(lang as Language);
		},
		[setLanguage],
	);

	return (
		<Combobox store={combobox} onOptionSubmit={onChange}>
			<Combobox.Target>
				<InputBase
					id={id}
					component="button"
					type="button"
					pointer
					onClick={() => combobox.toggleDropdown()}
				>
					<Option t={t} language={language} />
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

/* Internal */

type OptionProps = {
	language: Language;
	t: TFunction<"common">;
};

const Option: FC<OptionProps> = ({ language, t }) => {
	return (
		<Combobox.Option
			value={language}
			className="flex items-center justify-between w-full"
		>
			<Text>
				{t().components["local-config"].configs.language.options[language]}
			</Text>
		</Combobox.Option>
	);
};
