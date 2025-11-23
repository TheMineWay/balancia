import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Button, Card, Group, InputWrapper } from "@mantine/core";
import type { TransactionModel } from "@shared/models";
import { useCallback, useId, useMemo } from "react";
import { BiLink } from "react-icons/bi";
import { IoAddOutline, IoTrash } from "react-icons/io5";

const isOptionDisabled = ({
	value,
	items,
}: {
	value: TransactionModel;
	items: DebtOriginLinkFormItem[];
}) =>
	value.amount >= 0 || items.some((item) => item.transaction?.id === value.id);

export type DebtOriginLinkFormItem = {
	transaction: TransactionModel | null;
	amount: number;
};

type Props = {
	items?: DebtOriginLinkFormItem[];
	onChange?: (data: DebtOriginLinkFormItem[]) => void;
	onSubmit?: (items: DebtOriginLinkFormItem[]) => void;
	loading?: boolean;
};

export const DebtOriginTransactionsLinkForm: FC<Props> = ({
	items = [],
	onChange,
	onSubmit,
	loading = false,
}) => {
	const { t } = useTranslation("finances");
	const { t: tCommon } = useTranslation("common");

	// IDs
	const transactionToLinkId = useId();

	const isAnyOptionEmpty = useMemo(
		() => items.some((item) => !item.transaction && item.amount === 0),
		[items],
	);

	const onItemChange = useCallback(
		(index: number, newItem: DebtOriginLinkFormItem) => {
			if (!onChange) return;
			const updatedItems = [...items];
			updatedItems[index] = newItem;
			onChange(updatedItems);
		},
		[items, onChange],
	);

	const onDeleteItem = useCallback(
		(index: number) => {
			if (!onChange) return;
			const updatedItems = items.filter((_, i) => i !== index);
			onChange(updatedItems);
		},
		[items, onChange],
	);

	const appendItem = useCallback(
		(newItem: DebtOriginLinkFormItem) => {
			if (!onChange) return;
			if (
				items.some(
					(item) =>
						Boolean(newItem.transaction) &&
						item.transaction?.id === newItem.transaction?.id,
				)
			)
				return;

			const updatedItems = items ? [...items, newItem] : [newItem];
			onChange(updatedItems);
		},
		[items, onChange],
	);

	const onSelect = useCallback(
		(transaction: TransactionModel | null) => {
			if (!transaction) return;

			const newItem: DebtOriginLinkFormItem = {
				transaction,
				amount: Math.abs(transaction.amount),
			};
			appendItem(newItem);
		},
		[appendItem],
	);

	const onAddEmptyClick = useCallback(() => {
		const newItem: DebtOriginLinkFormItem = {
			transaction: null,
			amount: 0,
		};
		appendItem(newItem);
	}, [appendItem]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<InputWrapper
					label={t().debt.link.form.fields.transaction.Label}
					labelProps={{ htmlFor: transactionToLinkId }}
				>
					<Group gap="xs" justify="space-between">
						<MyTransactionsSelector
							onChange={onSelect}
							mapOption={(o) => ({
								...o,
								disabled: isOptionDisabled({ value: o.value, items }),
							})}
							triggerId={transactionToLinkId}
							className="flex-1"
						/>
						<Button
							disabled={isAnyOptionEmpty}
							leftSection={<IoAddOutline />}
							onClick={onAddEmptyClick}
						>
							{tCommon().expressions["Add-empty"]}
						</Button>
					</Group>
				</InputWrapper>
				{items.map((item, index) => (
					<TransactionLink
						key={`x${item.transaction?.id}` || `_${index}`}
						items={items}
						item={item}
						setItem={(newItem) => onItemChange(index, newItem)}
						onDelete={() => onDeleteItem(index)}
					/>
				))}
			</div>
			<Button
				loading={loading}
				onClick={() => onSubmit?.(items)}
				leftSection={<BiLink />}
			>
				{t().debt.link.form.Submit}
			</Button>
		</div>
	);
};

/* Internal */
type TransactionLinkProps = {
	items: DebtOriginLinkFormItem[];
	item: Partial<DebtOriginLinkFormItem>;
	setItem: (item: DebtOriginLinkFormItem) => void;
	onDelete: CallableFunction;
};

const TransactionLink: FC<TransactionLinkProps> = ({
	items,
	item: { transaction, amount },
	setItem,
	onDelete,
}) => {
	const onSelect = useCallback(
		(transaction: TransactionModel | null) => {
			setItem({ transaction, amount: amount || 0 });
		},
		[setItem, amount],
	);

	return (
		<Card withBorder>
			<div className="flex flex-col gap-2">
				<Group gap="sm" align="center" justify="space-between">
					<div className="flex-1">
						<MyTransactionsSelector
							onChange={onSelect}
							value={transaction?.id}
							mapOption={(o) => ({
								...o,
								disabled: isOptionDisabled({ value: o.value, items }),
							})}
						/>
					</div>
					<ActionIcon color="red" onClick={() => onDelete()}>
						<IoTrash />
					</ActionIcon>
				</Group>
				<CashInputField
					max={Math.abs(transaction?.amount || Infinity)}
					min={0}
					value={amount ? Math.abs(amount) : 0}
					onChange={(value) => {
						if (value === null) return;
						setItem({
							transaction: transaction || null,
							amount: Math.abs(value),
						});
					}}
				/>
			</div>
		</Card>
	);
};
