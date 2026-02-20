import { useMySegmentCategoryMatcherCreateMutation } from "@fts/finances/budgets/my-segment-automatchers/api/use-my-segment-category-matcher-create.mutation";
import { MySegmentAutomatcherCategoryUsedWarning } from "@fts/finances/budgets/my-segment-automatchers/components/status/my-segment-automatcher-category-used-warning";
import { SegmentAutomatcherForm } from "@fts/finances/budgets/segment-automatchers/components/form/segment-automatcher.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { Stack } from "@mantine/core";
import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_CREATE_SCHEMA,
	type BudgetSegmentCategoryAutoMatcherCreateModel,
} from "@shared/models";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	segmentId: number;
	onSuccess?: (matcher: BudgetSegmentCategoryAutoMatcherCreateModel) => void;
};

export const MySegmentAutomatcherCreateManager: FC<Props> = ({
	segmentId,
	onSuccess,
}) => {
	const { t } = useTranslation("budget");
	const { mutate: createMatcher, isPending: isCreating } =
		useMySegmentCategoryMatcherCreateMutation();

	const [hasConflict, setHasConflict] = useState(false);
	const createForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			segmentId,
		},
	});
	const formState = createForm.watch();

	const onFormSuccess = useCallback(
		(newMatcher: BudgetSegmentCategoryAutoMatcherCreateModel) => {
			createMatcher(newMatcher, {
				onSuccess: () => onSuccess?.(newMatcher),
			});
		},
		[onSuccess, createMatcher],
	);

	return (
		<Stack>
			<SegmentAutomatcherForm
				form={createForm}
				submitText={t()["budget-segment-auto-matchers"].managers.create.Submit}
				onSuccess={onFormSuccess}
				submitIcon={<IoAddOutline />}
				isMutating={isCreating}
				disableSubmit={hasConflict}
			/>
			<MySegmentAutomatcherCategoryUsedWarning
				segmentId={formState.segmentId}
				categoryId={formState.categoryId}
				onStatus={setHasConflict}
			/>
		</Stack>
	);
};
