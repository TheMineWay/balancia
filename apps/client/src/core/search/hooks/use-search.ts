import { useCallback, useMemo, useState } from "react";

export type UseSearchOptions<T extends object> = {
	initialFilters?: Partial<T>;
};

export const useSearch = <T extends object>({
	initialFilters = {},
}: UseSearchOptions<T>) => {
	const [filters, setFilters] = useState(initialFilters);

	const clear = useCallback(() => setFilters({}), []);

	const setFilter = <K extends keyof T>(key: K, value: T[K] | null) => {
		const newFilters = { ...filters };
		if (value === null) {
			delete newFilters[key];
		} else {
			newFilters[key] = value;
		}
		setFilters(newFilters);
	};

	const requestData = useMemo(() => {
		return { filters };
	}, [filters]);

	return {
		filters,
		setFilters,
		setFilter,
		clear,

		// Data
		requestData,
	};
};

export type UseSearch<T extends object> = ReturnType<typeof useSearch<T>>;
