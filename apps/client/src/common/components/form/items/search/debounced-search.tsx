import type { UseDebouncedSearch } from "@common/components/form/items/search/use-debounced-search";
import { Input, type InputProps } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

type SearchProps = {
  manager: UseDebouncedSearch;
} & Omit<InputProps, "leftSection" | "onChange">;

export const DebouncedSearch: FC<SearchProps> = ({ manager, ...props }) => {
  return (
    <Input
      leftSection={<BiSearch />}
      {...props}
      value={manager.value}
      onChange={(e) => manager.setValue(e.target.value)}
    />
  );
};
