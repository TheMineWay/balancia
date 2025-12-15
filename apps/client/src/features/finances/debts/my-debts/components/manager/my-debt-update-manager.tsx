import { DebtForm } from "@fts/finances/debts/debts/components/forms/debt.form";
import { useMyDebtUpdateMutation } from "@fts/finances/debts/my-debts/api/use-my-debt-update.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	DEBT_CREATE_SCHEMA,
	type DebtCreateModel,
	type DebtListModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...DEBT_CREATE_SCHEMA.omit({ userId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (debt: Omit<DebtCreateModel, "userId">) => void;
	debt: DebtListModel;
};

export const MyDebtUpdateManager: FC<Props> = ({ onSuccess, debt }) => {
	const { t } = useTranslation("finances");
	const { mutate: updateDebt, isPending: isUpdating } = useMyDebtUpdateMutation(
		debt.id,
	);

	const updateForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			debtorId: debt.debtorId,
			amount: debt.amount,
			reason: debt.reason,
			notifiedAt: debt.notifiedAt,
			status: debt.status,
		},
	});

	const onFormSuccess = useCallback(
		(debtInfo: Omit<DebtCreateModel, "userId">) => {
			updateDebt(debtInfo, {
				onSuccess: () => onSuccess?.(debtInfo),
			});
		},
		[onSuccess, updateDebt],
	);

	return (
		<DebtForm
			form={updateForm}
			submitText={t().debt.update.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoPencilOutline />}
			loading={isUpdating}
		/>
	);
};
