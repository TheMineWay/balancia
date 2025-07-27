import { useCallback, useEffect, useMemo, useState } from "react";

type Options = {
  total?: number;
  initialPageSize?: number;
  initialPage?: number;
  onPaginationChange?: (pagination: Pagination) => void;
};

type Pagination = {
  page: number;
  pageSize: number;
};

export const usePagination = ({
  total: initialTotal = 0,
  initialPageSize = 20,
  initialPage = 1,
  onPaginationChange,
}: Options = {}) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: initialPage,
    pageSize: initialPageSize,
  });
  const [totalState, setTotalState] = useState(initialTotal);

  const requestData = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.pageSize,
    }),
    [pagination]
  );
  const control = useMemo(
    () => ({
      total: totalState,
    }),
    [pagination, totalState]
  );

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
  };
};

export type UsePagination = ReturnType<typeof usePagination>;
