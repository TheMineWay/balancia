import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import { TRANSACTION_MODEL_VALUES, type TransactionCreateModel } from "@shared/models";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
    form: UseFormReturn<TransactionCreateModel>;
    onSuccess?: (transaction: TransactionCreateModel) => void;
    loading?: boolean;
    submitText: string;
	submitIcon?: React.ReactNode;
}

export const TransactionForm: FC<Props> = ({ form, onSuccess, submitText, submitIcon, loading }) => {
    const { t } = useTranslation('transaction');
    const amountFieldId = useId();

    const { handleSubmit, watch, register, control } = form;

    const formValues = watch();

    return <Form onSubmit={handleSubmit((transaction) => onSuccess?.(transaction))}>
        <Input.Wrapper label={t().models.transaction.subject.Label}>
            <Input maxLength={TRANSACTION_MODEL_VALUES.subject.maxLength} {...register('subject')}/>
        </Input.Wrapper>
        <Input.Wrapper label={t().models.transaction.amount.Label} labelProps={{ htmlFor: amountFieldId }}>
            <Controller control={control} name="amount" render={({ field: {ref, ...restField }}) => <CashInputField {...restField} id={amountFieldId}/>}/>
        </Input.Wrapper>

        <Button disabled={formValues.amount === 0} loading={loading} leftSection={submitIcon} type="submit">
            {submitText}
        </Button>
    </Form>;
}
