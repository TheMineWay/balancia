import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { useTranslation } from "@i18n/use-translation";
import type { TransactionModel } from "@shared/models";
import { useCallback } from "react";

export type DebtLinkFormItem = {
	transactionId: TransactionModel["id"];
	amount: number;
};

type Props = {
	items?: DebtLinkFormItem[];
	onChange?: (data: DebtLinkFormItem[]) => void;
};

export const DebtTransactionsLinkForm: FC<Props> = ({ items, onChange }) => {
	const { t: commonT } = useTranslation("common");

	const onItemChange = useCallback(
		(index: number, newItem: DebtLinkFormItem) => {
			if (!items || !onChange) return;
			const updatedItems = [...items];
			updatedItems[index] = newItem;
			onChange(updatedItems);
		},
		[items, onChange],
	);

	return (
		<div>
			<MyTransactionsSelector />
			{items?.map((item, index) => (
				<TransactionLink
					key={item.transactionId}
					item={item}
					setItem={(newItem) => onItemChange(index, newItem)}
				/>
			))}
		</div>
	);
};

/* Internal */
type TransactionLinkProps = {
	item: Omit<DebtLinkFormItem, "amount"> & { amount?: number };
	setItem: (item: DebtLinkFormItem) => void;
};

const TransactionLink: FC<TransactionLinkProps> = ({ item, setItem }) => {
	return <div className="flex flex-col gap-2"></div>;
};
