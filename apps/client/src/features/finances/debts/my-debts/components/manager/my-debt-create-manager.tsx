import { DebtForm } from "@fts/finances/debts/debts/components/forms/debt.form";
import { useMyDebtCreateMutation } from "@fts/finances/debts/my-debts/api/use-my-debt-create.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	DEBT_CREATE_SCHEMA,
	DEBT_MODEL_VALUES,
	type DebtCreateModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...DEBT_CREATE_SCHEMA.omit({ userId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (debt: Omit<DebtCreateModel, "userId">) => void;
};

export const MyDebtCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");

	const { mutate: createDebt, isPending: isCreating } =
		useMyDebtCreateMutation();

	const debtForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			notifiedAt: new Date(),
			status: DEBT_MODEL_VALUES.status.default,
		},
	});

	const onFormSuccess = useCallback(
		(newDebt: Omit<DebtCreateModel, "userId">) => {
			createDebt(newDebt, {
				onSuccess: () => onSuccess?.(newDebt),
			});
		},
		[onSuccess, createDebt],
	);

	return (
		<DebtForm
			form={debtForm}
			submitText={t().debt.create.Submit}
			submitIcon={<IoAddOutline />}
			onSuccess={onFormSuccess}
			loading={isCreating}
		/>
	);
};
