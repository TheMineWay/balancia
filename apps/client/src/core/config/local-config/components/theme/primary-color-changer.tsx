import { UI_COLORS } from "@constants/env/env.constant";
import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { Combobox, Group, InputBase, Text, useCombobox } from "@mantine/core";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useCallback, useMemo } from "react";
import { BiCheck } from "react-icons/bi";

const COLORS = UI_COLORS;

type Props = {
	id?: string;
};

export const PrimaryColorChanger: FC<Props> = ({ id }) => {
	const { t } = useTranslation("common");
	const { config, setConfig } = useLocalConfig();

	const combobox = useCombobox();

	const onChange = useCallback(
		(v: (typeof COLORS)[number] | null) => {
			if (!v) return;
			setConfig({
				...config,
				theme: {
					...config.theme,
					primaryColor: v,
				},
			});
		},
		[setConfig, config],
	);

	const options = useMemo(() => {
		return COLORS.map((color) => (
			<Option
				key={color}
				color={color}
				t={t}
				isSelected={color === config.theme.primaryColor}
			/>
		));
	}, [t, config.theme.primaryColor]);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(v) => onChange(v as (typeof COLORS)[number] | null)}
		>
			<Combobox.Target>
				<InputBase
					id={id}
					component="button"
					type="button"
					pointer
					onClick={() => combobox.toggleDropdown()}
				>
					<Option t={t} color={config.theme.primaryColor} />
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options mah={150} style={{ overflowY: "auto" }}>
					{options}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

type OptionProps = {
	color: (typeof COLORS)[number];
	isSelected?: boolean;
	t: TFunction<"common">;
};

const Option: FC<OptionProps> = ({ color, t, isSelected }) => {
	return (
		<Combobox.Option
			value={color}
			className="flex items-center justify-between w-full"
		>
			<Group gap="xs">
				{isSelected && <BiCheck />}
				<Text>
					{
						t().components["local-config"].configs["primary-color"].options[
							color
						]
					}
				</Text>
			</Group>
			<div
				className="h-4 w-4 rounded-xs"
				style={{ backgroundColor: `var(--mantine-color-${color}-5)` }}
			></div>
		</Combobox.Option>
	);
};
