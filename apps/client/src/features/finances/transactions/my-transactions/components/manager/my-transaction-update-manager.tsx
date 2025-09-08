import { useMyTransactionUpdateMutation } from "@fts/finances/transactions/my-transactions/api/use-my-transaction-update.mutation";
import { TransactionForm } from "@fts/finances/transactions/transactions/components/forms/transaction.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	TRANSACTION_CREATE_SCHEMA,
	type TransactionCreateModel,
	type TransactionModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

// Modify schema to deny zero amounts
const SCHEMA = z
	.object({
		...TRANSACTION_CREATE_SCHEMA.omit({ amount: true }).shape,
		amount: TRANSACTION_CREATE_SCHEMA.shape.amount.refine((val) => val !== 0),
	})
	.required();

type Props = {
	transaction: TransactionModel;
	onSuccess?: CallableFunction;
};

export const MyTransactionUpdateManager: FC<Props> = ({
	onSuccess,
	transaction: { id: transactionId, ...transaction },
}) => {
	const { t } = useTranslation("finances");
	const { mutate: updateTransaction, isPending: isUpdating } =
		useMyTransactionUpdateMutation(transactionId);

	const createForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: transaction,
	});

	const onFormSucess = useCallback(
		(transaction: TransactionCreateModel) => {
			updateTransaction(transaction, {
				onSuccess: () => onSuccess?.(),
			});
		},
		[updateTransaction, onSuccess],
	);

	return (
		<TransactionForm
			form={createForm}
			submitText={t().transaction.update.Submit}
			submitIcon={<IoPencilOutline />}
			onSuccess={onFormSucess}
			isMutating={isUpdating}
		/>
	);
};
