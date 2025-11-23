import { CashInputField } from "@common/extended-ui/form/components/finances/cash.input-field";
import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Card, Group, InputWrapper } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import type { DebtPaymentCreateModel, TransactionModel } from "@shared/models";
import { useCallback, useId, useMemo } from "react";
import { BiLink } from "react-icons/bi";
import { IoAddOutline, IoTrash } from "react-icons/io5";

const isOptionDisabled = ({
	value,
	items,
}: {
	value: TransactionModel;
	items: DebtPaymentsLinkFormItem[];
}) =>
	value.amount <= 0 || items.some((item) => item.transaction?.id === value.id);

export type DebtPaymentsLinkFormItem = Omit<
	DebtPaymentCreateModel,
	"transactionId" | "debtId"
> & {
	transaction: TransactionModel | null;
};

type Props = {
	items?: DebtPaymentsLinkFormItem[];
	onChange?: (data: DebtPaymentsLinkFormItem[]) => void;
	onSubmit?: (items: DebtPaymentsLinkFormItem[]) => void;
	loading?: boolean;
};

export const DebtPaymentTransactionsLinkForm: FC<Props> = ({
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
		(index: number, newItem: DebtPaymentsLinkFormItem) => {
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
		(newItem: DebtPaymentsLinkFormItem) => {
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

			const newItem: DebtPaymentsLinkFormItem = {
				transaction,
				amount: Math.abs(transaction.amount),
				paidAt: new Date(),
			};
			appendItem(newItem);
		},
		[appendItem],
	);

	const onAddEmptyClick = useCallback(() => {
		const newItem: DebtPaymentsLinkFormItem = {
			transaction: null,
			amount: 0,
			paidAt: new Date(),
		};
		appendItem(newItem);
	}, [appendItem]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<InputWrapper
					label={t().debt.link.forms.general.fields.transaction.Label}
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
						key={`_${
							// biome-ignore lint/suspicious/noArrayIndexKey: I cannot use any id
							index
						}`}
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
				{t().debt.link.forms.general.Submit}
			</Button>
		</div>
	);
};

/* Internal */
type TransactionLinkProps = {
	items: DebtPaymentsLinkFormItem[];
	item: Partial<DebtPaymentsLinkFormItem>;
	setItem: (item: DebtPaymentsLinkFormItem) => void;
	onDelete: CallableFunction;
};

const TransactionLink: FC<TransactionLinkProps> = ({
	items,
	item: { transaction, amount, paidAt },
	setItem,
	onDelete,
}) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const transactionFieldId = useId();
	const cashInputFieldId = useId();
	const paidAtFieldId = useId();

	const setField = useCallback(
		(
			key: keyof DebtPaymentsLinkFormItem,
			value: DebtPaymentsLinkFormItem[typeof key],
		) => {
			setItem({
				transaction: transaction || null,
				amount: amount || 0,
				paidAt: paidAt || new Date(),
				[key]: value,
			});
		},
		[transaction, amount, paidAt, setItem],
	);

	return (
		<Card withBorder>
			<div className="flex flex-col gap-4">
				<InputWrapper
					label={t().debt.link.forms.general.fields.transaction.Label}
					labelProps={{ htmlFor: transactionFieldId }}
				>
					<MyTransactionsSelector
						onChange={(v) => setField("transaction", v)}
						value={transaction?.id}
						mapOption={(o) => ({
							...o,
							disabled: isOptionDisabled({ value: o.value, items }),
						})}
						triggerId={transactionFieldId}
					/>
				</InputWrapper>
				<Group gap="xs" grow wrap="wrap">
					<InputWrapper
						label={t().debt.link.forms.general.fields.amount.Label}
						labelProps={{ htmlFor: cashInputFieldId }}
					>
						<CashInputField
							id={cashInputFieldId}
							max={Math.abs(transaction?.amount || Infinity)}
							min={0}
							value={amount ? Math.abs(amount) : 0}
							onChange={(value) => {
								if (value === null) return;
								setField("amount", value);
							}}
						/>
					</InputWrapper>
					<InputWrapper
						label={t().debt.models["debt-payment"].paidAt.Label}
						labelProps={{ htmlFor: paidAtFieldId }}
					>
						<DateTimePicker
							id={paidAtFieldId}
							value={paidAt}
							onChange={(v) => {
								if (!v) return;
								setField("paidAt", new Date(v));
							}}
						/>
					</InputWrapper>
				</Group>
				<Button
					color="red"
					leftSection={<IoTrash />}
					onClick={() => onDelete()}
					size="xs"
				>
					{commonT().expressions.Delete}
				</Button>
			</div>
		</Card>
	);
};
