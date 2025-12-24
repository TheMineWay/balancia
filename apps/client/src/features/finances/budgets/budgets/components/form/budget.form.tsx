import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BUDGET_MODEL_VALUES, type BudgetCreateModel } from "@shared/models";
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

	const { formState, handleSubmit, control } = form;

	return (
		<Form onSubmit={handleSubmit((budget) => onSuccess?.(budget))}>
			{/* Name */}
			<Input.Wrapper label={t().models.budget.name.Label}>
				<Input
					{...form.register("name")}
					maxLength={BUDGET_MODEL_VALUES.name.maxLength}
				/>
			</Input.Wrapper>

			{/* Description */}
			<Input.Wrapper label={t().models.budget.description.Label}>
				<Textarea
					{...form.register("description")}
					maxLength={BUDGET_MODEL_VALUES.description.maxLength}
					minRows={3}
				/>
			</Input.Wrapper>

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
				label={t().models.budget.fromDate.Label}
				{...form.register("fromDate")}
				value={form.watch("fromDate") ? form.watch("fromDate") : null}
				onChange={(date) => {
					if (date) form.setValue("fromDate", new Date(date));
				}}
			/>

			{/* To Date */}
			<DateInput
				label={t().models.budget.toDate.Label}
				{...form.register("toDate")}
				value={form.watch("toDate") ? form.watch("toDate") : null}
				onChange={(date) => {
					if (date) form.setValue("toDate", new Date(date));
				}}
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
