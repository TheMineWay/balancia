import { generatePageSizeFromLimits } from "@core/pagination/lib/generate-page-sizes-from-limits.util";
import { Select, type SelectProps } from "@mantine/core";
import { useLocalConfig } from "@providers/config/local-config.context";
import { GLOBAL_CONFIGS } from "@shared/constants";
import { useMemo } from "react";

export type PageSizeSelectorProps = {
	value?: number | null;
	onChange: (value: number) => void;
} & Omit<SelectProps, "value" | "onChange">;

export const PageSizeSelector: FC<PageSizeSelectorProps> = ({
	value: rawValue,
	onChange,
	...props
}) => {
	const {
		config: { pagination: paginationConfig },
	} = useLocalConfig();

	const value = rawValue
		? rawValue.toString()
		: GLOBAL_CONFIGS.PAGINATION.DEFAULT_PAGE_SIZE.toString();

	const options = useMemo(
		() =>
			generatePageSizeFromLimits({
				min: GLOBAL_CONFIGS.PAGINATION.MIN_PAGE_SIZE,
				max: GLOBAL_CONFIGS.PAGINATION.MAX_PAGE_SIZE,
				strategy: paginationConfig?.pageSizeSelectorStrategy,
			}).map((size) => ({
				value: size.toString(),
				label: size.toString(),
			})),
		[paginationConfig?.pageSizeSelectorStrategy],
	);

	return (
		<Select
			allowDeselect={false}
			{...props}
			value={value}
			onChange={(v) => {
				if (v) onChange(Number(v));
			}}
			data={options}
		/>
	);
};
