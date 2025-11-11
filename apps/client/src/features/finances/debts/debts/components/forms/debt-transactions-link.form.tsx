import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Card, InputWrapper, Text } from "@mantine/core";
import type { TransactionModel } from "@shared/models";
import { useCallback } from "react";
import { IoTrash } from "react-icons/io5";

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

	const onDeleteItem = useCallback(
		(index: number) => {
			if (!items || !onChange) return;
			const updatedItems = items.filter((_, i) => i !== index);
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
				amount: Math.abs(transaction.amount),
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
						onDelete={() => onDeleteItem(index)}
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
	onDelete: CallableFunction;
};

const TransactionLink: FC<TransactionLinkProps> = ({
	item: { transaction, amount },
	setItem,
	onDelete,
}) => {
	return (
		<Card withBorder>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<div className="flex-1">
						<div className="flex gap-2">
							<RenderCurrency amount={Math.abs(transaction.amount)} />
							{transaction.subject && (
								<Text>
									<b>{transaction.subject}</b>
								</Text>
							)}
						</div>
					</div>
					<ActionIcon color="red" onClick={() => onDelete()}>
						<IoTrash />
					</ActionIcon>
				</div>
				<CashInputField
					max={Math.abs(transaction.amount)}
					min={0}
					value={amount ? Math.abs(amount) : 0}
					onChange={(value) => {
						if (value === null) return;
						setItem({ transaction, amount: Math.abs(value) });
					}}
				/>
			</div>
		</Card>
	);
};
