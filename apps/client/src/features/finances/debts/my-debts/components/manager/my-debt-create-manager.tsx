import { DebtForm } from "@fts/finances/debts/debts/components/forms/debt.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { DEBT_CREATE_SCHEMA, type DebtCreateModel } from "@shared/models";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...DEBT_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: (debt: DebtCreateModel) => void;
};

export const MyDebtCreateManager: FC<Props> = () => {
	const { t } = useTranslation("finances");

	const debtForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			notifiedAt: new Date(),
		},
	});

	return (
		<DebtForm
			form={debtForm}
			submitText={t().debt.create.Submit}
			submitIcon={<IoAddOutline />}
		/>
	);
};
