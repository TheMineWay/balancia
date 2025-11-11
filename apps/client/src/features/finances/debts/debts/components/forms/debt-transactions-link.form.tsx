import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { useTranslation } from "@i18n/use-translation";
import { InputWrapper } from "@mantine/core";
import type { TransactionModel } from "@shared/models";
import { useCallback } from "react";

export type DebtLinkFormItem = {
	transaction: TransactionModel;
	amount: number;
};

type Props = {
	items?: DebtLinkFormItem[];
	onChange?: (data: DebtLinkFormItem[]) => void;
};

export const DebtTransactionsLinkForm: FC<Props> = ({ items, onChange }) => {
	const { t } = useTranslation("finances");

	const onItemChange = useCallback(
		(index: number, newItem: DebtLinkFormItem) => {
			if (!items || !onChange) return;
			const updatedItems = [...items];
			updatedItems[index] = newItem;
			onChange(updatedItems);
		},
		[items, onChange],
	);

	const onSelect = useCallback(
		(transaction: TransactionModel | null) => {
			if (!transaction || !onChange) return;
			if (items?.some((item) => item.transaction.id === transaction.id)) return;

			const newItem: DebtLinkFormItem = {
				transaction,
				amount: transaction.amount,
			};
			const updatedItems = items ? [...items, newItem] : [newItem];
			onChange(updatedItems);
		},
		[items, onChange],
	);

	return (
		<div className="flex flex-col gap-4">
			<InputWrapper label={t().debt.link.form.fields.transaction.Label}>
				<MyTransactionsSelector onChange={onSelect} />
			</InputWrapper>
			<div className="flex flex-col gap-2">
				{items?.map((item, index) => (
					<TransactionLink
						key={item.transaction.id}
						item={item}
						setItem={(newItem) => onItemChange(index, newItem)}
					/>
				))}
			</div>
		</div>
	);
};

/* Internal */
type TransactionLinkProps = {
	item: Omit<DebtLinkFormItem, "amount"> & { amount?: number };
	setItem: (item: DebtLinkFormItem) => void;
};

const TransactionLink: FC<TransactionLinkProps> = ({ item, setItem }) => {
	return <div className="flex flex-col gap-2">{item.transaction.subject}</div>;
};
