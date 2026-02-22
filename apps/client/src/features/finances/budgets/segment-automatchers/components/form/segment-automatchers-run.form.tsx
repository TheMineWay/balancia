import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel } from "@shared/models";
import type { FC } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel>;
	onSuccess?: (
		filters: BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel,
	) => void;
	isLoading?: boolean;
	submitText?: string;
};

export const SegmentAutomatchersRunForm: FC<Props> = ({
	form,
	onSuccess,
	isLoading = false,
	submitText,
}) => {
	const { t } = useTranslation("budget");
	const { handleSubmit, control } = form;

	return (
		<Form onSubmit={handleSubmit((filters) => onSuccess?.(filters))}>
			<Stack gap="md">
				<Controller
					control={control}
					name="fromDate"
					render={({ field: { value, onChange } }) => (
						<DatePickerInput
							label={
								t()["budget-segment-auto-matchers"].forms["run-matchers"][
									"from-date"
								].Label
							}
							placeholder={
								t()["budget-segment-auto-matchers"].forms["run-matchers"][
									"from-date"
								].Placeholder
							}
							value={value}
							onChange={(date) => onChange(date)}
							clearable
						/>
					)}
				/>
				<Controller
					control={control}
					name="toDate"
					render={({ field: { value, onChange } }) => (
						<DatePickerInput
							label={
								t()["budget-segment-auto-matchers"].forms["run-matchers"][
									"to-date"
								].Label
							}
							placeholder={
								t()["budget-segment-auto-matchers"].forms["run-matchers"][
									"to-date"
								].Placeholder
							}
							value={value}
							onChange={(date) => onChange(date)}
							clearable
						/>
					)}
				/>
				<Button type="submit" loading={isLoading}>
					{submitText ??
						t()["budget-segment-auto-matchers"].actions["run-auto-matchers"]
							.Trigger}
				</Button>
			</Stack>
		</Form>
	);
};
