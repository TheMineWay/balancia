import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { DebtStatusSelector } from "@fts/finances/debts/debts/components/forms/items/debt-status-selector";
import { MyContactsSelector } from "@fts/social/contacts/my-contacts/components/form/my-contacts.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { DEBT_MODEL_VALUES, type DebtCreateModel } from "@shared/models";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type CreateModel = Omit<DebtCreateModel, "userId">;

type Props = {
	form: UseFormReturn<CreateModel>;
	onSuccess?: (debt: CreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	loading?: boolean;
};

export const DebtForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	loading,
	onSuccess,
}) => {
	const { t } = useTranslation("finances");

	const amountFieldId = useId();
	const reasonFieldId = useId();
	const notifiedAtFieldId = useId();
	const statusFieldId = useId();

	const { handleSubmit, control, formState } = form;

	return (
		<Form onSubmit={handleSubmit((debt) => onSuccess?.(debt))}>
			{/* Debtor */}
			<Input.Wrapper label={t().debt.models.debt.debtorId.Label}>
				<Controller
					control={control}
					name="debtorId"
					render={({ field: { value, onChange } }) => (
						<MyContactsSelector value={value} onChange={onChange} />
					)}
				/>
			</Input.Wrapper>

			{/* Amount */}
			<Input.Wrapper
				label={t().debt.models.debt.amount.Label}
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

			{/* Reason */}
			<Input.Wrapper
				label={t().debt.models.debt.reason.Label}
				labelProps={{ htmlFor: reasonFieldId }}
			>
				<Controller
					control={control}
					name="reason"
					render={({ field: { value, ...field } }) => (
						<Textarea
							{...field}
							maxLength={DEBT_MODEL_VALUES.reason.maxLength}
							minRows={3}
							style={{ width: "100%" }}
							value={value ?? ""}
							id={reasonFieldId}
						/>
					)}
				/>
			</Input.Wrapper>

			{/* Notified at */}
			<Input.Wrapper
				label={t().debt.models.debt.notifiedAt.Label}
				labelProps={{ htmlFor: notifiedAtFieldId }}
			>
				<Controller
					control={control}
					name="notifiedAt"
					render={({ field: { ref: _, ...restField } }) => (
						<DateTimePicker {...restField} id={notifiedAtFieldId} />
					)}
				/>
			</Input.Wrapper>

			{/* Status */}
			<Input.Wrapper
				label={t().debt.models.debt.status.Label}
				labelProps={{ htmlFor: statusFieldId }}
			>
				<Controller
					control={control}
					name="status"
					render={({ field: { value, onChange } }) => (
						<DebtStatusSelector
							value={value}
							onChange={onChange}
							id={statusFieldId}
						/>
					)}
				/>
			</Input.Wrapper>

			<Button
				disabled={!formState.isValid}
				loading={loading}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
