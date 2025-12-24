import { BudgetForm } from "@fts/finances/budgets/budgets/components/form/budget.form";
import { useMyBudgetUpdateMutation } from "@fts/finances/budgets/my-budgets/api/use-my-budget-update.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	BUDGET_CREATE_SCHEMA,
	type BudgetCreateModel,
	type BudgetModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...BUDGET_CREATE_SCHEMA.omit({ userId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (budget: Omit<BudgetCreateModel, "userId">) => void;
	budget: BudgetModel;
};

export const MyBudgetUpdateManager: FC<Props> = ({ onSuccess, budget }) => {
	const { t } = useTranslation("budget");
	const { mutate: updateBudget, isPending: isUpdating } =
		useMyBudgetUpdateMutation(budget.id);

	const updateForm = useForm<Omit<BudgetCreateModel, "userId">>({
		resolver: zodResolver(SCHEMA),
		defaultValues: budget,
		mode: "onChange",
	});

	const onFormSuccess = useCallback(
		(budgetInfo: Omit<BudgetCreateModel, "userId">) => {
			updateBudget(budgetInfo, {
				onSuccess: () => onSuccess?.(budgetInfo),
			});
		},
		[onSuccess, updateBudget],
	);

	return (
		<BudgetForm
			form={updateForm}
			submitText={t().update.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoPencilOutline />}
			isMutating={isUpdating}
		/>
	);
};
