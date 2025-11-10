import {
	type DebtLinkFormItem,
	DebtTransactionsLinkForm,
} from "@fts/finances/debts/debts/components/forms/debt-transactions-link.form";
import type { DebtModel } from "@shared/models";
import { useState } from "react";

type Props = {
	debt: DebtModel;
};

export const MyDebtOriginLinkManager: FC<Props> = () => {
	const [items, setItems] = useState<DebtLinkFormItem[]>([]);

	return <DebtTransactionsLinkForm items={items} onChange={setItems} />;
};
