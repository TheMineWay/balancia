import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BUDGET_MODEL_VALUES, type BudgetCreateModel } from "@shared/models";
import { addDays } from "date-fns";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<Omit<BudgetCreateModel, "userId">>;
	onSuccess?: (budget: Omit<BudgetCreateModel, "userId">) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const BudgetForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
}) => {
	const { t } = useTranslation("budget");

	const amountFieldId = useId();

	const { formState, handleSubmit, control, watch } = form;

	const fromDateValue = watch("fromDate");
	const toDateValue = watch("toDate");

	return (
		<Form onSubmit={handleSubmit((budget) => onSuccess?.(budget))}>
			{/* Name */}
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Input.Wrapper label={t().models.budget.name.Label}>
						<Input
							{...field}
							maxLength={BUDGET_MODEL_VALUES.name.maxLength}
							error={fieldState.error?.message}
						/>
					</Input.Wrapper>
				)}
			/>

			{/* Description */}
			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<Input.Wrapper label={t().models.budget.description.Label}>
						<Textarea
							{...field}
							value={field.value ?? ""}
							maxLength={BUDGET_MODEL_VALUES.description.maxLength}
							minRows={3}
						/>
					</Input.Wrapper>
				)}
			/>

			{/* Amount */}
			<Input.Wrapper
				label={t().models.budget.amount.Label}
				labelProps={{ htmlFor: amountFieldId }}
			>
				<Controller
					control={control}
					name="amount"
					render={({ field: { ref: _, ...restField } }) => (
						<CashInputField {...restField} id={amountFieldId} />
					)}
				/>
			</Input.Wrapper>

			{/* From Date */}
			<DateInput
				label={t().models.budget["from-date"].Label}
				{...form.register("fromDate")}
				value={form.watch("fromDate") ? form.watch("fromDate") : null}
				onChange={(date) => {
					if (date) form.setValue("fromDate", new Date(date));
				}}
				maxDate={toDateValue ? addDays(toDateValue, -1) : undefined}
				error={Boolean(formState.errors.fromDate)}
			/>

			{/* To Date */}
			<DateInput
				label={t().models.budget["to-date"].Label}
				{...form.register("toDate")}
				value={form.watch("toDate") ? form.watch("toDate") : null}
				onChange={(date) => {
					if (date) form.setValue("toDate", new Date(date));
				}}
				minDate={fromDateValue ? addDays(fromDateValue, 1) : undefined}
				error={Boolean(formState.errors.toDate)}
			/>

			{/* Submit */}
			<Button
				disabled={!formState.isValid}
				loading={isMutating}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
