import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import {
	type DebtLinkFormItem,
	DebtTransactionsLinkForm,
} from "@fts/finances/debts/debts/components/forms/debt-transactions-link.form";
import { useTranslation } from "@i18n/use-translation";
import { Divider, Group, Text } from "@mantine/core";
import type { DebtModel } from "@shared/models";
import { useMemo, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const DEBT_STAT_CLASSNAME = "flex-1 flex flex-col items-center justify-center";

type Props = {
	debt: DebtModel;
};

export const MyDebtOriginLinkManager: FC<Props> = ({ debt }) => {
	const { t } = useTranslation("finances");
	const [items, setItems] = useState<DebtLinkFormItem[]>([]);

	const { debtCoverage, overCoverage } = useMemo(() => {
		const debtCoverage = items.reduce((total, item) => total + item.amount, 0);
		const overCoverage = debtCoverage > debt.amount;

		return { debtCoverage, overCoverage };
	}, [items, debt.amount]);

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
						{overCoverage && <FiAlertTriangle color="red" />}
						<RenderCurrency size="xl" amount={debtCoverage} />
					</Group>
				</div>
			</div>
			<DebtTransactionsLinkForm items={items} onChange={setItems} />
		</div>
	);
};
