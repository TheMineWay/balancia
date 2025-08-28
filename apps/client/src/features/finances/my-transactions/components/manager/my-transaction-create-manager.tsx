import { useCreateTransactionMutation } from "@fts/finances/my-transactions/api/use-create-transaction.mutation";
import { TransactionForm } from "@fts/finances/transactions/components/forms/transaction.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	TRANSACTION_CREATE_SCHEMA,
	TRANSACTION_MODEL_VALUES,
	type TransactionCreateModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

// Modify schema to deny zero amounts
const SCHEMA = z
	.object({
		...TRANSACTION_CREATE_SCHEMA.omit({ amount: true }).shape,
		amount: TRANSACTION_CREATE_SCHEMA.shape.amount.refine((val) => val !== 0),
	})
	.required();

type Props = {
	onSuccess?: CallableFunction;
};

export const MyTransactionCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");
	const { mutate: createTransaction, isPending: isCreating } =
		useCreateTransactionMutation();

	const createForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			amount: 0,
			performedAt: new Date(),
			performedAtPrecision:
				TRANSACTION_MODEL_VALUES.performedAtPrecision.default,
		},
	});

	const onFormSucess = useCallback(
		(transaction: TransactionCreateModel) => {
			createTransaction(transaction, {
				onSuccess: () => onSuccess?.(),
			});
		},
		[createTransaction, onSuccess],
	);

	return (
		<TransactionForm
			form={createForm}
			submitText={t().transaction.create.Title}
			submitIcon={<IoAddOutline />}
			onSuccess={onFormSucess}
			isMutating={isCreating}
		/>
	);
};
