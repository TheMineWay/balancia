import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { MyContactsSelector } from "@fts/social/contacts/my-contacts/components/form/my-contacts.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import type { DebtCreateModel } from "@shared/models";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<DebtCreateModel>;
	onSuccess?: (debt: DebtCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const DebtForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
}) => {
	const { t } = useTranslation("finances");

	const amountFieldId = useId();
	const reasonFieldId = useId();
	const notifiedAtFieldId = useId();

	const { handleSubmit, control, formState } = form;

	return (
		<Form onSubmit={handleSubmit((debt) => onSuccess?.(debt))}>
			{/* Debtor */}
			<Input.Wrapper label={t().debt.models.debt.debtorId.Label} required>
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
							maxLength={255}
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
