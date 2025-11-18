import type { UseDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { useTranslation } from "@i18n/use-translation";
import {
	ActionIcon,
	Combobox,
	TextInput,
	type TextInputProps,
	useCombobox,
} from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

type Data<V> = {
	label: string;
	value: V;
	disabled?: boolean;
};

export type SelectSearchProps<T extends string | number, V = T> = {
	data: Data<V>[];
	search: UseDebouncedSearch;
	valueFetch?: (value: T) => Promise<Data<V> | null>;
	getKey: (item: V) => T;

	// Input
	placeholder?: string;
	value?: T | null;
	setValue?: (value: V | null) => void;
	allowClear?: boolean;
	triggerId?: string | number;
} & Pick<
	TextInputProps,
	| "onBlur"
	| "onFocus"
	| "onClick"
	| "size"
	| "leftSection"
	| "aria-label"
	| "className"
	| "styles"
>;

/**
 * This component is a search-select input that allows users to select an item from a dropdown list.
 * It includes a search functionality that debounces input changes. As you need to provide the `useDebouncedSearch` hook, you can manage the search state externally.
 */
export function SelectSearch<T extends string | number, V = T>({
	data: rawData,
	placeholder,
	search,
	value,
	valueFetch,
	getKey,
	allowClear = false,
	setValue,
	onBlur,
	onClick,
	onFocus,
	triggerId,
	...props
}: Readonly<SelectSearchProps<T, V>>) {
	const { t } = useTranslation("common");
	const combobox = useCombobox({});

	const [fetchedData, setFetchedData] = useState<Data<V> | null>(null);

	// Fetch data for the selected value.
	// In case the selected item is not fetched in the options
	useEffect(() => {
		if (fetchedData?.value === value) return;

		if (!value) setFetchedData(null);
		else valueFetch?.(value).then((v) => setFetchedData(v ?? null));
	}, [value, valueFetch, fetchedData?.value]);

	// Add fetched value to the data array
	const data = useMemo(() => {
		const cleanData = [...rawData];
		if (fetchedData && !rawData.find((d) => d.value === fetchedData.value))
			cleanData.push(fetchedData);
		return cleanData;
	}, [rawData, fetchedData]);

	// As the Combobox cannot operate with non-string values directly,
	// we create a mapping of index to value for the options.
	const valueMap = useMemo(() => {
		return data.reduce<[string, V][]>((acc, item, idx) => {
			acc.push([idx.toString(), item.value]);
			return acc;
		}, []);
	}, [data]);

	const options = useMemo(() => {
		return data
			.filter((item): item is Data<V> => item !== null)
			.map((item) => (
				<Combobox.Option
					key={getKey(item.value)}
					value={valueMap.find((v) => v[1] === item.value)?.[0] ?? ""}
					disabled={item.disabled}
				>
					{item.label}
				</Combobox.Option>
			));
	}, [data, valueMap, getKey]);

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
		return data.find((option) => getKey(option.value) === value) || null;
	}, [data, value, getKey]);

	const closeComponent = useMemo(
		() =>
			allowClear && value ? (
				<ActionIcon
					variant="transparent"
					aria-label={t().expressions.Clear}
					onClick={() => {
						setValue?.(null);
						search.setValue("");
					}}
				>
					<IoCloseOutline />
				</ActionIcon>
			) : null,
		[allowClear, t, setValue, search, value],
	);

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
					rightSection={closeComponent}
					value={selectedOption ? selectedOption.label : search.value}
					onChange={(e) => {
						combobox.openDropdown();
						setValue?.(null);
						search.setValue(e.currentTarget.value);
					}}
					placeholder={placeholder}
					onClick={(e) => {
						combobox.openDropdown();
						onClick?.(e);
					}}
					onFocus={(e) => {
						combobox.openDropdown();
						onFocus?.(e);
					}}
					onBlur={(e) => {
						combobox.closeDropdown();
						search.setValue("");
						onBlur?.(e);
					}}
					id={triggerId?.toString()}
					{...props}
				/>
			</Combobox.Target>

			<Combobox.Dropdown style={{ maxHeight: 300, overflowY: "auto" }}>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
