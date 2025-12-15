import { useTranslation } from "@i18n/use-translation";
import { Select, type SelectProps } from "@mantine/core";
import { DebtStatus } from "@shared/models";
import { useMemo } from "react";

type Props = {
	value: DebtStatus | null;
	onChange: (value: DebtStatus | null) => void;
	allowClear?: boolean;
	id?: string;
} & Omit<SelectProps, "data" | "value" | "onChange">;

export const DebtStatusSelector: FC<Props> = ({
	value = null,
	onChange,
	allowClear = false,
	...props
}) => {
	const { t } = useTranslation("finances");

	const options = useMemo(
		() =>
			Object.values(DebtStatus).map((status) => ({
				value: status,
				label: t().debt.models["debt-status"][status].Label,
			})),
		[t],
	);
	return (
		<Select
			data={options}
			value={value}
			onChange={(newValue) => onChange?.(newValue as DebtStatus | null)}
			allowDeselect={allowClear}
			{...props}
		/>
	);
};
