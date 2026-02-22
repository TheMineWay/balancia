import { useMySegmentAutomatchersRunMutation } from "@fts/finances/budgets/my-segment-automatchers/api/use-my-segment-automatchers-run.mutation";
import { SegmentAutomatchersRunForm } from "@fts/finances/budgets/segment-automatchers/components/form/segment-automatchers-run.form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA,
	type BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel,
} from "@shared/models";
import type { FC } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type Props = {
	segmentId: number;
	onSuccess?: () => void;
};

export const MySegmentAutomatcherRunManager: FC<Props> = ({
	segmentId,
	onSuccess,
}) => {
	const { mutate: runAutoMatchers, isPending: isRunning } =
		useMySegmentAutomatchersRunMutation();

	const runForm =
		useForm<BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel>({
			resolver: zodResolver(
				BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA,
			),
			defaultValues: {
				fromDate: undefined,
				toDate: undefined,
			},
		});

	const handleFormSuccess = useCallback(
		(filters: BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel) => {
			runAutoMatchers(
				{ segmentId, filters },
				{ onSuccess: () => onSuccess?.() },
			);
		},
		[segmentId, runAutoMatchers, onSuccess],
	);

	return (
		<SegmentAutomatchersRunForm
			form={runForm}
			onSuccess={handleFormSuccess}
			isLoading={isRunning}
		/>
	);
};
