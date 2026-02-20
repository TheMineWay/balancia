import { useMySegmentCategoryMatcherBySegmentAndCategoryQuery } from "@fts/finances/budgets/my-segment-automatchers/api/use-my-segment-category-matcher-by-segment-and-category.query";
import { useTranslation } from "@i18n/use-translation";
import { Alert } from "@mantine/core";
import type { BudgetSegmentModel, CategoryModel } from "@shared/models";
import { useEffect } from "react";
import { IoWarning } from "react-icons/io5";

type Props = {
	categoryId: CategoryModel["id"];
	segmentId: BudgetSegmentModel["id"];
	onStatus?: (hasConflict: boolean) => void;
};

export const MySegmentAutomatcherCategoryUsedWarning: FC<Partial<Props>> = ({
	categoryId,
	segmentId,
	onStatus,
}) => {
	if (!categoryId || !segmentId) return null;

	return (
		<Component
			categoryId={categoryId}
			segmentId={segmentId}
			onStatus={onStatus}
		/>
	);
};

const Component: FC<Props> = ({ categoryId, segmentId, onStatus }) => {
	const { t } = useTranslation("budget");

	const { data: existingMatcher } =
		useMySegmentCategoryMatcherBySegmentAndCategoryQuery({
			categoryId,
			segmentId,
		});

	useEffect(() => {
		onStatus?.(Boolean(existingMatcher?.matcher));
	}, [existingMatcher, onStatus]);

	if (!existingMatcher?.matcher) return null;

	return (
		<Alert
			title={t()["budget-segment-auto-matchers"].status.duplicated.Title}
			color="red"
			icon={<IoWarning />}
		>
			{t()["budget-segment-auto-matchers"].status.duplicated.Message}
		</Alert>
	);
};
