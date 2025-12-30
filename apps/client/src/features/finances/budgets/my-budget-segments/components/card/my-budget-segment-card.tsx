import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { useMyBudgetByIdQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budget-by-id.query";
import { Badge, Divider, Flex, Group, Text, Title } from "@mantine/core";
import type { BudgetSegmentModel } from "@shared/models";

type Props = {
	segment: BudgetSegmentModel;
};

export const MyBudgetSegmentCard: FC<Props> = ({ segment }) => {
	const { data: budget } = useMyBudgetByIdQuery(segment.budgetId);

	return (
		<Group gap="md" align="center" justify="center">
			<Flex direction="column">
				<Text size="xs">{budget?.name}</Text>
				<Title order={2}>{segment.name}</Title>
			</Flex>
			<Divider orientation="vertical" />
			<Badge size="sm">
				{budget && (
					<RenderCurrency
						size="sm"
						amount={(budget.amount / 100) * segment.percent}
					/>
				)}
			</Badge>
		</Group>
	);
};
