import { useMyBudgetSegmentUpdateMutation } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segment-update.mutation";
import { BudgetSegmentForm } from "@fts/finances/budgets/segments/components/form/budget-segment.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	BUDGET_SEGMENT_CREATE_SCHEMA,
	type BudgetSegmentCreateModel,
	type BudgetSegmentModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...BUDGET_SEGMENT_CREATE_SCHEMA.omit({ budgetId: true }).shape,
	})
	.required();

type Props = {
	onSuccess?: (segmentInfo: Omit<BudgetSegmentCreateModel, "budgetId">) => void;
	segment: BudgetSegmentModel;
};

export const MyBudgetSegmentUpdateManager: FC<Props> = ({
	onSuccess,
	segment,
}) => {
	const { t } = useTranslation("budget");
	const { mutate: updateSegment, isPending: isUpdating } =
		useMyBudgetSegmentUpdateMutation(segment.id);

	const updateForm = useForm<Omit<BudgetSegmentCreateModel, "budgetId">>({
		resolver: zodResolver(SCHEMA),
		defaultValues: segment,
		mode: "onChange",
	});

	const onFormSuccess = useCallback(
		(segmentInfo: Omit<BudgetSegmentCreateModel, "budgetId">) => {
			updateSegment(segmentInfo, {
				onSuccess: () => onSuccess?.(segmentInfo),
			});
		},
		[onSuccess, updateSegment],
	);

	return (
		<BudgetSegmentForm
			form={updateForm}
			submitText={t().update.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoPencilOutline />}
			isMutating={isUpdating}
		/>
	);
};
