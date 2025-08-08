import type { UseDebouncedSearch } from "@common/extended-ui/form/items/search/use-debounced-search";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useCallback, useMemo } from "react";

type Data<T extends string | number> = {
	label: string;
	value: T;
};

type Props<T extends string | number> = {
	data: Data<T>[];
	search: UseDebouncedSearch;

	// Input
	placeholder?: string;
	value?: T | null;
	setValue?: (value: T | null) => void;
};

/**
 * This component is a search-select input that allows users to select an item from a dropdown list.
 * It includes a search functionality that debounces input changes. As you need to provide the `useDebouncedSearch` hook, you can manage the search state externally.
 */
export function SelectSearch<T extends string | number>({
	data,
	placeholder,
	search,
	value,
	setValue,
}: Readonly<Props<T>>) {
	const combobox = useCombobox({});

	// As the Combobox cannot operate with non-string values directly,
	// we create a mapping of index to value for the options.
	const valueMap = useMemo(() => {
		return data.reduce<[string, T][]>((acc, item, idx) => {
			acc.push([idx.toString(), item.value]);
			return acc;
		}, []);
	}, [data]);

	const options = useMemo(() => {
		return data.map((item) => (
			<Combobox.Option
				key={item.value}
				value={valueMap.find((v) => v[1] === item.value)?.[0] ?? ""}
			>
				{item.label}
			</Combobox.Option>
		));
	}, [data, valueMap]);

	const onValueChanged = useCallback(
		(value: string) => {
			// Retrieve original value from the valueMap based on the selected index
			const val = valueMap.find((v) => v[0] === value)?.[1];
			setValue?.(typeof val === "undefined" ? null : val);
		},
		[valueMap, setValue],
	);

	const selectedOption = useMemo(() => {
		if (value === undefined || value === null) return null;
		return data.find((option) => option.value === value) || null;
	}, [data, value]);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(v) => {
				onValueChanged(v);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<TextInput
					value={selectedOption ? selectedOption.label : search.value}
					onChange={(e) => {
						combobox.openDropdown();
						setValue?.(null);
						search.setValue(e.currentTarget.value);
					}}
					placeholder={placeholder}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => combobox.closeDropdown()}
				/>
			</Combobox.Target>

			<Combobox.Dropdown style={{ maxHeight: 300, overflowY: "auto" }}>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
