import type { UseDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { Input, type InputProps } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

type SearchProps = {
	manager: UseDebouncedSearch;
	placeholder?: string;
} & Omit<InputProps, "leftSection" | "onChange">;

/**
 * Search input component with built-in debouncing functionality.
 * Automatically delays search execution to improve performance and reduce API calls.
 */
export const DebouncedSearch: FC<SearchProps> = ({
	manager,
	placeholder,
	...props
}) => {
	return (
		<Input
			leftSection={<BiSearch />}
			{...props}
			value={manager.value}
			placeholder={placeholder}
			onChange={(e) => manager.setValue(e.target.value)}
		/>
	);
};
