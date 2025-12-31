import { MyBudgetSegmentSelector } from "@fts/finances/budgets/my-budget-segments/components/form/my-budget-segment.selector";
import { MyBudgetsSelector } from "@fts/finances/budgets/my-budgets/components/form/my-budgets.selector";
import { Flex, Select } from "@mantine/core";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { useEffect, useState } from "react";

type Props = {
	budgetId?: BudgetModel["id"];
	onChange?: (segment: BudgetSegmentModel | null) => void;
	value: BudgetSegmentModel["id"] | null;
	allowClear?: boolean;
	disabled?: boolean;
};

export const MyAllBudgetSegmentSelector: FC<Props> = ({
	value: segmentValue,
	onChange: onSegmentChange,
	budgetId,
	disabled = false,
}) => {
	const [selectedBudget, setSelectedBudget] = useState<
		BudgetModel["id"] | null
	>(budgetId || null);

	useEffect(() => setSelectedBudget(budgetId || null), [budgetId]);

	return (
		<Flex direction="column" gap="xs">
			<MyBudgetsSelector
				value={selectedBudget ?? null}
				onChange={(b) => {
					setSelectedBudget(b?.id || null);
					onSegmentChange?.(null);
				}}
				disabled={disabled}
			/>

			{selectedBudget ? (
				<MyBudgetSegmentSelector
					budgetId={selectedBudget}
					value={segmentValue}
					onChange={onSegmentChange}
					disabled={disabled}
				/>
			) : (
				<Select disabled />
			)}
		</Flex>
	);
};
