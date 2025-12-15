import type { UseDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { FormItemClearButton } from "@common/extended-ui/form/components/shared/clear-button";
import { Group, Input, type InputProps } from "@mantine/core";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

type SearchProps = {
	manager: UseDebouncedSearch;
	placeholder?: string;
	allowClear?: boolean;
} & Omit<InputProps, "leftSection" | "onChange">;

/**
 * Search input component with built-in debouncing functionality.
 * Automatically delays search execution to improve performance and reduce API calls.
 */
export const DebouncedSearch: FC<SearchProps> = ({
	manager,
	placeholder,
	allowClear = false,
	...props
}) => {
	const isEmpty = useMemo(
		() => !manager.value || manager.value.length === 0,
		[manager.value],
	);

	const rightSectionComponent = useMemo(() => {
		if (!allowClear && !props.rightSection) return null;

		return (
			<Group>
				{props.rightSection}
				{allowClear && !isEmpty && (
					<FormItemClearButton onClear={() => manager.setValue("")} />
				)}
			</Group>
		);
	}, [props.rightSection, allowClear, isEmpty, manager.setValue]);

	return (
		<Input
			leftSection={<BiSearch />}
			rightSectionPointerEvents="auto"
			{...props}
			rightSection={rightSectionComponent}
			value={manager.value}
			placeholder={placeholder}
			onChange={(e) => manager.setValue(e.target.value)}
		/>
	);
};
