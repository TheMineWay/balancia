import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import {
	type DebtLinkFormItem,
	DebtTransactionsLinkForm,
} from "@fts/finances/debts/debts/components/forms/debt-transactions-link.form";
import { useMyDebtOriginSetTransactionsMutation } from "@fts/finances/debts/my-debts/api/origins/use-my-debt-origin-set-transactions.mutation";
import { useTranslation } from "@i18n/use-translation";
import { Divider, Group, Text } from "@mantine/core";
import type { DebtModel } from "@shared/models";
import { useCallback, useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheckCircle } from "react-icons/fi";

const DEBT_STAT_CLASSNAME = "flex-1 flex flex-col items-center justify-center";

type Props = {
	debt: DebtModel;
	onSuccess?: CallableFunction;
};

export const MyDebtOriginLinkManager: FC<Props> = ({ debt, onSuccess }) => {
	const { t } = useTranslation("finances");
	const [items, setItems] = useState<DebtLinkFormItem[]>([]);

	const { mutate: setTransactions, isPending: isSettingTransactions } =
		useMyDebtOriginSetTransactionsMutation();

	const onSubmit = useCallback(
		(transactions: DebtLinkFormItem[]) => {
			setTransactions(
				{
					debtId: debt.id,
					transactions: transactions.map((t) => ({
						id: t.transaction.id,
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
			<DebtTransactionsLinkForm
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
