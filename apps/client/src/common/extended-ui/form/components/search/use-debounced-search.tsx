import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState } from "react";

type Options = {
	onSearch?: (value: string) => void;
	debounceTime?: number;
};

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
