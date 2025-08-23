import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState } from "react";

type Options = {
	onSearch?: (value: string) => void;
	debounceTime?: number;
};

/**
 * Hook that provides debounced search functionality.
 * Delays the execution of search operations to improve performance and reduce unnecessary API calls.
 */
export const useDebouncedSearch = ({
	debounceTime = 300,
	onSearch,
}: Options = {}) => {
	const [value, setValue] = useState<string>("");
	const [debouncedValue, setDebouncedValue] = useState<string>("");
	const debouncedSearch = useDebouncedCallback((nv: string) => {
		setDebouncedValue(nv);
		onSearch?.(nv);
	}, debounceTime);

	useEffect(() => {
		debouncedSearch(value);
	}, [value, debouncedSearch]);

	return {
		debouncedValue,
		value,
		setValue,
	};
};

export type UseDebouncedSearch = ReturnType<typeof useDebouncedSearch>;
