import { TimePrecisionSelector } from "@common/extended-ui/form/components/date/time-precision.selector";
import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
	TimePrecision,
	TRANSACTION_MODEL_VALUES,
	type TransactionCreateModel,
} from "@shared/models";
import { startOfDay } from "date-fns";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<TransactionCreateModel>;
	onSuccess?: (transaction: TransactionCreateModel) => void;
	loading?: boolean;
	submitText: string;
	submitIcon?: React.ReactNode;
};

export const TransactionForm: FC<Props> = ({
	form,
	onSuccess,
	submitText,
	submitIcon,
	loading,
}) => {
	const { t } = useTranslation("finances");

	const amountFieldId = useId();
	const performedAtFieldId = useId();

	const { handleSubmit, watch, register, control, formState } = form;

	const formValues = watch();

	return (
		<Form onSubmit={handleSubmit((transaction) => onSuccess?.(transaction))}>
			{/* Subject */}
			<Input.Wrapper label={t().transaction.models.transaction.subject.Label}>
				<Input
					maxLength={TRANSACTION_MODEL_VALUES.subject.maxLength}
					{...register("subject")}
				/>
			</Input.Wrapper>

			{/* Amount */}
			<Input.Wrapper
				label={t().transaction.models.transaction.amount.Label}
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

			{/* Performed at & time precision */}
			<Input.Wrapper
				label={t().transaction.models.transaction.performedAt.Label}
				labelProps={{ htmlFor: performedAtFieldId }}
				classNames={{ root: "flex flex-col gap-1" }}
			>
				<Controller
					control={control}
					name="performedAtPrecision"
					render={({ field }) => (
						<TimePrecisionSelector
							{...field}
							onChange={(tp) => {
								field.onChange(tp);
								if (tp === TimePrecision.DATE) {
									// If switching to date only, remove the time part
									const currentDate = form.getValues("performedAt");
									form.setValue("performedAt", startOfDay(currentDate));
								}
							}}
						/>
					)}
				/>
				<Controller
					control={control}
					name="performedAt"
					render={({ field: { ref: _, ...restField } }) => (
						<DateTimePicker
							{...restField}
							id={performedAtFieldId}
							timePickerProps={{
								disabled:
									formValues.performedAtPrecision === TimePrecision.DATE,
							}}
						/>
					)}
				/>
			</Input.Wrapper>

			<Button
				disabled={formValues.amount === 0 && !formState.isValid}
				loading={loading}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
