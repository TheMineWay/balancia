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
  const debouncedSearch = useDebouncedCallback((nv: string) => {
    onSearch?.(nv);
  }, debounceTime);

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  return {
    value,
    setValue,
  };
};

export type UseDebouncedSearch = ReturnType<typeof useDebouncedSearch>;
