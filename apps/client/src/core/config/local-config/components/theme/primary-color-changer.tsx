import { UI_COLORS } from "@constants/env/env.constant";
import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { Group, Select, Text } from "@mantine/core";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useCallback } from "react";
import { BiCheck } from "react-icons/bi";

const COLORS = UI_COLORS;

type Props = {
	id?: string;
};

export const PrimaryColorChanger: FC<Props> = ({ id }) => {
	const { t } = useTranslation("common");
	const { config, setConfig } = useLocalConfig();

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

	return (
		<Select
			renderOption={(option) => (
				<Option
					t={t}
					key={option.option.value}
					color={option.option.value as (typeof COLORS)[number]}
					isSelected={option.checked}
				/>
			)}
			data={COLORS}
			value={config.theme.primaryColor}
			max={1}
			onChange={(v) => onChange(v as (typeof COLORS)[number] | null)}
			id={id}
		/>
	);
};

type OptionProps = {
	color: (typeof COLORS)[number];
	isSelected?: boolean;
	t: TFunction<"common">;
};

const Option: FC<OptionProps> = ({ color, t, isSelected }) => {
	return (
		<div className="flex items-center justify-between w-full">
			<Group gap="xs">
				{isSelected && <BiCheck />}
				<Text>
					{t()["local-config"].configs["primary-color"].options[color]}
				</Text>
			</Group>
			<div
				className="h-4 w-4 rounded-xs"
				style={{ backgroundColor: `var(--mantine-color-${color}-5)` }}
			></div>
		</div>
	);
};
