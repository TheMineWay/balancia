import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import {
	type DebtOriginLinkFormItem,
	DebtOriginTransactionsLinkForm,
} from "@fts/finances/debts/debts/components/forms/debt-origin-transactions-link.form";
import { useMyDebtOriginGetTransactionsQuery } from "@fts/finances/debts/my-debts/api/origins/use-my-debt-origin-get-transactions.query";
import { useMyDebtOriginSetTransactionsMutation } from "@fts/finances/debts/my-debts/api/origins/use-my-debt-origin-set-transactions.mutation";
import { useTranslation } from "@i18n/use-translation";
import { Divider, Group, Loader, Text } from "@mantine/core";
import type {
	DebtModel,
	DebtOriginModel,
	TransactionModel,
} from "@shared/models";
import { useCallback, useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheckCircle } from "react-icons/fi";

const DEBT_STAT_CLASSNAME = "flex-1 flex flex-col items-center justify-center";

type Props = {
	debt: DebtModel;
	onSuccess?: CallableFunction;
};

export const MyDebtOriginLinkManager: FC<Props> = (props) => {
	const { data: debtOrigins, isLoading: isLoadingOrigins } =
		useMyDebtOriginGetTransactionsQuery(props.debt.id);

	if (isLoadingOrigins) return <Loader />;

	return <Component {...props} debtOrigins={debtOrigins?.transactions} />;
};

const Component: FC<
	Props & {
		debtOrigins?: (DebtOriginModel & {
			transaction: TransactionModel | null;
		})[];
	}
> = ({ debt, onSuccess, debtOrigins = [] }) => {
	const { t } = useTranslation("finances");
	const [items, setItems] = useState<DebtOriginLinkFormItem[]>(debtOrigins);

	const { mutate: setTransactions, isPending: isSettingTransactions } =
		useMyDebtOriginSetTransactionsMutation();

	const onSubmit = useCallback(
		(transactions: DebtOriginLinkFormItem[]) => {
			setTransactions(
				{
					debtId: debt.id,
					transactions: transactions.map((t) => ({
						transactionId: t.transaction?.id || null,
						amount: t.amount,
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
			<DebtOriginTransactionsLinkForm
				items={items}
				onChange={setItems}
				onSubmit={onSubmit}
				loading={isSettingTransactions}
				disableSubmit={debtState === DebtState.OVER_COVERED}
			/>
		</div>
	);
};

enum DebtState {
	COVERED = "COVERED",
	UNCOVERED = "UNCOVERED",
	OVER_COVERED = "OVER_COVERED",
}
