import { BudgetForm } from "@fts/finances/budgets/budgets/components/form/budget.form";
import { useMyBudgetCreateMutation } from "@fts/finances/budgets/my-budgets/api/use-my-budget-create.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { BUDGET_CREATE_SCHEMA, type BudgetCreateModel } from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...BUDGET_CREATE_SCHEMA.omit({ userId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (budget: Omit<BudgetCreateModel, "userId">) => void;
};

export const MyBudgetCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("budget");
	const { mutate: createBudget, isPending: isCreating } =
		useMyBudgetCreateMutation();

	const createForm = useForm<Omit<BudgetCreateModel, "userId">>({
		resolver: zodResolver(SCHEMA),
		mode: "onChange",
	});

	const onFormSuccess = useCallback(
		(newBudget: Omit<BudgetCreateModel, "userId">) => {
			createBudget(newBudget, {
				onSuccess: () => onSuccess?.(newBudget),
			});
		},
		[onSuccess, createBudget],
	);

	return (
		<BudgetForm
			form={createForm}
			submitText={t().create.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoAddOutline />}
			isMutating={isCreating}
		/>
	);
};
