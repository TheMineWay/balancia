import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import {
	type DebtPaymentsLinkFormItem,
	DebtPaymentTransactionsLinkForm,
} from "@fts/finances/debts/debts/components/forms/debt-payment-transactions-link.form";
import { useMyDebtPaymentGetTransactionsQuery } from "@fts/finances/debts/my-debts/api/payments/use-my-debt-payment-get-transactions.query";
import { useMyDebtPaymentSetTransactionsMutation } from "@fts/finances/debts/my-debts/api/payments/use-my-debt-payment-set-transactions.mutation";
import { useTranslation } from "@i18n/use-translation";
import { Divider, Group, Loader, Text } from "@mantine/core";
import type {
	DebtModel,
	DebtPaymentModel,
	TransactionModel,
} from "@shared/models";
import { useCallback, useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheckCircle } from "react-icons/fi";

const DEBT_STAT_CLASSNAME = "flex-1 flex flex-col items-center justify-center";

type Props = {
	debt: DebtModel;
	onSuccess?: CallableFunction;
};

export const MyDebtPaymentsLinkManager: FC<Props> = (props) => {
	const { data: debtPayments, isLoading: isLoadingPayments } =
		useMyDebtPaymentGetTransactionsQuery(props.debt.id);

	if (isLoadingPayments) return <Loader />;

	return <Component {...props} debtPayments={debtPayments?.transactions} />;
};

const Component: FC<
	Props & {
		debtPayments?: (DebtPaymentModel & {
			transaction: TransactionModel | null;
		})[];
	}
> = ({ debt, onSuccess, debtPayments = [] }) => {
	const { t } = useTranslation("finances");
	const [items, setItems] = useState<DebtPaymentsLinkFormItem[]>(debtPayments);

	const { mutate: setTransactions, isPending: isSettingTransactions } =
		useMyDebtPaymentSetTransactionsMutation();

	const onSubmit = useCallback(
		(transactions: DebtPaymentsLinkFormItem[]) => {
			setTransactions(
				{
					debtId: debt.id,
					transactions: transactions.map((t) => ({
						transactionId: t.transaction?.id || null,
						amount: t.amount,
						paidAt: t.paidAt,
					})),
				},
				{
					onSuccess: () => {
						onSuccess?.();
					},
				},
			);
		},
		[debt, onSuccess, setTransactions],
	);

	const { debtCoverage, debtState } = useMemo(() => {
		const debtCoverage = items.reduce((total, item) => total + item.amount, 0);
		const debtState =
			debtCoverage === debt.amount
				? DebtState.COVERED
				: debtCoverage < debt.amount
					? DebtState.UNCOVERED
					: DebtState.OVER_COVERED;
		return { debtCoverage, debtState };
	}, [items, debt.amount]);

	const debtCovered = debtState === DebtState.COVERED;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4 justify-between">
				<div className={DEBT_STAT_CLASSNAME}>
					<Text>
						<b>{t().debt.expressions.Debt}</b>
					</Text>
					<RenderCurrency size="xl" amount={debt.amount} />
				</div>
				<Divider orientation="vertical" />
				<div className={DEBT_STAT_CLASSNAME}>
					<Text>
						<b>{t().debt.expressions["Debt-coverage"]}</b>
					</Text>
					<Group gap="xs">
						{/* Debt state representation */}
						{debtCovered ? (
							<FiCheckCircle color="green" />
						) : debtState === DebtState.UNCOVERED ? (
							<FiArrowDown color="red" />
						) : (
							<FiArrowUp color="red" />
						)}

						<RenderCurrency size="xl" amount={debtCoverage} />
					</Group>
				</div>
			</div>
			<DebtPaymentTransactionsLinkForm
				items={items}
				onChange={setItems}
				onSubmit={onSubmit}
				loading={isSettingTransactions}
			/>
		</div>
	);
};

enum DebtState {
	COVERED = "COVERED",
	UNCOVERED = "UNCOVERED",
	OVER_COVERED = "OVER_COVERED",
}
