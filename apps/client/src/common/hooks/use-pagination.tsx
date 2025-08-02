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

export const usePagination = ({
  total: initialTotal = 0,
  initialPageSize = 20,
  initialPage = 1,
  onPaginationChange,
}: Options = {}) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: initialPage,
    limit: initialPageSize,
  });
  const [totalState, setTotalState] = useState(initialTotal);

  const requestData = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
    }),
    [pagination]
  );
  const control = useMemo(
    () => ({
      total: totalState,
    }),
    [totalState]
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
    [setTotalState, totalState]
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
  };
};

export type UsePagination = ReturnType<typeof usePagination>;
