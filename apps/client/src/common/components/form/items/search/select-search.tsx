import type { UsePagination } from "@common/hooks/use-pagination";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { useCallback, useMemo } from "react";

type Data = {
  label: string;
  value: string;
};

type Props = {
  data: Data[];
  pagination: UsePagination;
  setSearch?: (search: string) => void;
  search?: string | null;

  // Input
  placeholder?: string;
};

export const SelectSearch: FC<Props> = ({
  data,
  pagination,
  placeholder,
  setSearch,
  search,
}) => {
  const combobox = useCombobox({});

  const options = useMemo(() => {
    return data.map((item) => (
      <Combobox.Option key={item.value} value={item.value}>
        {item.label}
      </Combobox.Option>
    ));
  }, [data]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // near bottom, load more
      console.log("near bottom");
    }
  }, []);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        setSearch?.(value);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        onScroll={handleScroll}
        style={{ maxHeight: 300, overflowY: "auto" }}
      >
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
