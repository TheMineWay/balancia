import { useTranslation } from "@i18n/use-translation";
import { Combobox, InputBase, InputWrapper, useCombobox } from "@mantine/core";
import {
	AUTO_ASSIGN_TRIGGER_FIELD_MODEL_VALUES,
	type AutoAssignCreateModel,
	AutoAssignTriggerMatchOption,
	type AutoAssignTriggerTypes,
} from "@shared/models";
import { useMemo } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<AutoAssignCreateModel>;
	fields: AutoAssignFieldItem[];
};

export const AutoAssignFieldBasedForm: FC<Props> = ({ form, fields }) => {
	const { t } = useTranslation("common");

	return (
		<>
			{/* Field */}
			<InputWrapper
				label={
					t().components.automatisms["auto-matcher"].forms["field-based"].field
						.Label
				}
			>
				<Controller
					control={form.control}
					name="criteria.field"
					render={({ field: { ...restField } }) => (
						<FieldSelector {...restField} fields={fields} />
					)}
				/>
			</InputWrapper>

			{/* Match mode */}
			<InputWrapper
				label={
					t().components.automatisms["auto-matcher"].forms["field-based"][
						"match-mode"
					].Label
				}
			>
				<Controller
					control={form.control}
					name="criteria.matchMode"
					render={({ field: { ...restField } }) => (
						<MatchModeSelector {...restField} />
					)}
				/>
			</InputWrapper>

			{/* Value */}
			<InputWrapper
				label={
					t().components.automatisms["auto-matcher"].forms["field-based"].value
						.Label
				}
			>
				<Controller
					control={form.control}
					name="criteria.value"
					render={({ field: { ...restField } }) => (
						<InputBase
							{...restField}
							placeholder={
								t().components.automatisms["auto-matcher"].forms["field-based"]
									.value.Placeholder
							}
							maxLength={AUTO_ASSIGN_TRIGGER_FIELD_MODEL_VALUES.value.maxLength}
						/>
					)}
				/>
			</InputWrapper>
		</>
	);
};

/* Internal */

type FieldSelectorProps = {
	value: string;
	onChange: (value: string) => void;
	fields: AutoAssignFieldItem[];
};

const FieldSelector: FC<FieldSelectorProps> = ({ value, onChange, fields }) => {
	const { t } = useTranslation("common");
	const combobox = useCombobox({});

	const options = useMemo(
		() =>
			fields.map((field) => ({
				value: field.field,
				label: field.label,
			})),
		[fields],
	);

	const selected = useMemo(
		() => options.find((i) => i.value === value),
		[options, value],
	);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(v) => {
				onChange(v);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron />}
					rightSectionPointerEvents="none"
					onClick={() => combobox.toggleDropdown()}
				>
					{selected?.label ||
						t().components.automatisms["auto-matcher"].forms["field-based"]
							.field.Placeholder}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{options.map((option) => (
						<Combobox.Option
							key={option.value}
							value={option.value}
							selected={option.value === value}
						>
							<p>{option.label}</p>
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

type MatchModeSelectorProps = {
	value: AutoAssignTriggerTypes["field"]["matchMode"];
	onChange: (value: AutoAssignTriggerTypes["field"]["matchMode"]) => void;
};

const MatchModeSelector: FC<MatchModeSelectorProps> = ({
	value = AutoAssignTriggerMatchOption.EQUALS,
	onChange,
}) => {
	const { t } = useTranslation("common");
	const combobox = useCombobox({});

	const options = useMemo(
		() => [
			{
				value: AutoAssignTriggerMatchOption.EQUALS,
				label:
					t().components.automatisms["auto-matcher"].forms["field-based"][
						"match-mode"
					].options.eq.Label,
			},
			{
				value: AutoAssignTriggerMatchOption.CONTAINS,
				label:
					t().components.automatisms["auto-matcher"].forms["field-based"][
						"match-mode"
					].options.contains.Label,
			},
		],
		[t],
	);

	const selected = useMemo(
		() => options.find((i) => i.value === value),
		[options, value],
	);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(v) => {
				onChange(v as AutoAssignTriggerMatchOption);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron />}
					rightSectionPointerEvents="none"
					onClick={() => combobox.toggleDropdown()}
				>
					{selected?.label}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{options.map((option) => (
						<Combobox.Option
							key={option.value}
							value={option.value}
							selected={option.value === value}
						>
							<p>{option.label}</p>
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

/* Types */

export type AutoAssignFieldItem = {
	field: string;
	label: string;
};
