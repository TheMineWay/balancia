import {
	NIVO_COLORS,
	type NivoColor,
} from "@common/extended-ui/chart/constants/nivo-color.enum";
import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { Combobox, Group, InputBase, Text, useCombobox } from "@mantine/core";
import { useMemo } from "react";
import { BiCheck } from "react-icons/bi";

type Props = {
	value?: NivoColor;
	onChange?: (color: NivoColor) => void;
	id?: string;
};

export const ChartThemeSelector: FC<Props> = ({
	value = null,
	onChange,
	id,
}) => {
	const { t } = useTranslation("common");

	const combobox = useCombobox();
	const options = useMemo(() => {
		return NIVO_COLORS.map((color) => (
			<Option t={t} isSelected={value === color} value={color} key={color} />
		));
	}, [t, value]);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(v) => onChange?.(v as NivoColor)}
		>
			<Combobox.Target>
				<InputBase
					id={id}
					component="button"
					type="button"
					pointer
					onClick={() => combobox.toggleDropdown()}
				>
					{value && <Option t={t} value={value} />}
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
	value: NivoColor;
	isSelected?: boolean;
	t: TFunction<"common">;
};

const Option: FC<OptionProps> = ({ value, isSelected = false, t }) => {
	return (
		<Combobox.Option value={value}>
			<Group gap="xs">
				{isSelected && <BiCheck />}
				<Text>{t().components.charts.themes[value].Name}</Text>
			</Group>
		</Combobox.Option>
	);
};
