import { useMyBudgetSegmentCreateMutation } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segment-create.mutation";
import { BudgetSegmentForm } from "@fts/finances/budgets/segments/components/form/budget-segment.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	BUDGET_SEGMENT_CREATE_SCHEMA,
	type BudgetModel,
	type BudgetSegmentCreateModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...BUDGET_SEGMENT_CREATE_SCHEMA.omit({ budgetId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (segment: Omit<BudgetSegmentCreateModel, "budgetId">) => void;
	budgetId: BudgetModel["id"];

	// Optional maximum percent to set on the percent field
	maxPercent?: number;
};

export const MyBudgetSegmentCreateManager: FC<Props> = ({
	onSuccess,
	budgetId,
	maxPercent = 100,
}) => {
	const { t } = useTranslation("budget");
	const { mutate: createSegment, isPending: isCreating } =
		useMyBudgetSegmentCreateMutation();

	const createForm = useForm<Omit<BudgetSegmentCreateModel, "budgetId">>({
		resolver: zodResolver(SCHEMA),
		mode: "onChange",
	});

	const onFormSuccess = useCallback(
		(newSegment: Omit<BudgetSegmentCreateModel, "budgetId">) => {
			createSegment(
				{ ...newSegment, budgetId },
				{
					onSuccess: () => onSuccess?.(newSegment),
				},
			);
		},
		[onSuccess, createSegment, budgetId],
	);

	return (
		<BudgetSegmentForm
			form={createForm}
			submitText={t().budget.managers.create.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoAddOutline />}
			isMutating={isCreating}
			maxPercent={maxPercent}
		/>
	);
};
