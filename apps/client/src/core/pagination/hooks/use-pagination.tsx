import { useLocalConfig } from "@providers/config/local-config.context";
import { GLOBAL_CONFIGS } from "@shared/constants";
import { useCallback, useEffect, useMemo, useState } from "react";

type Options = {
	total?: number;
	initialPageSize?: number;
	initialPage?: number;
	onPaginationChange?: (pagination: Pagination) => void;
};

type Pagination = {
	page: number;
	limit: number;
};

/**
 * Hook for managing pagination state and controls.
 * Provides pagination logic, state management, and helper functions for data fetching.
 */
export const usePagination = ({
	total: initialTotal = 0,
	initialPageSize,
	initialPage = 1,
	onPaginationChange,
}: Options = {}) => {
	const {
		config: { pagination: paginationConfig },
	} = useLocalConfig();

	const [pagination, setPagination] = useState<Pagination>({
		page: initialPage,
		limit:
			initialPageSize ??
			paginationConfig?.pageSize ??
			GLOBAL_CONFIGS.PAGINATION.DEFAULT_PAGE_SIZE,
	});
	const [totalState, setTotalState] = useState(initialTotal);

	const requestData = useMemo(
		() => ({
			page: pagination.page,
			limit: pagination.limit,
		}),
		[pagination],
	);
	const control = useMemo(
		() => ({
			total: Math.ceil(totalState / pagination.limit),
			onChange: (page: number) => setPagination({ ...pagination, page }),
		}),
		[totalState, pagination],
	);

	const hasMore = useMemo(() => {
		if (!pagination || !totalState) return false;
		return pagination.page * pagination.limit < totalState;
	}, [pagination, totalState]);

	const next = useCallback(() => {
		if (!hasMore) return;
		setPagination((prev) => ({
			...prev,
			page: prev.page + 1,
		}));
	}, [hasMore]);

	useEffect(() => {
		onPaginationChange?.(pagination);
	}, [pagination, onPaginationChange]);

	const setTotal = useCallback(
		(total: number) => {
			if (total < 0 || total === totalState) return;
			setTotalState(total);
		},
		[totalState],
	);

	const setLimit = useCallback(
		(newLimit: number) =>
			setPagination((prev) => ({ ...prev, limit: newLimit })),
		[],
	);

	return {
		pagination,
		setPagination,
		total: totalState,
		setTotal,
		control,
		requestData,
		hasMore,
		next,
		setLimit,
	};
};

export type UsePagination = ReturnType<typeof usePagination>;
