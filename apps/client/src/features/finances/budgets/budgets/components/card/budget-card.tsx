import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { Badge, Divider, Flex, Group, Title } from "@mantine/core";
import type { BudgetModel } from "@shared/models";
import { IoIosArrowRoundForward } from "react-icons/io";

type Props = {
	budget: BudgetModel;
};

export const BudgetCard: FC<Props> = ({ budget }) => {
	return (
		<Group gap="md" align="center" justify="center">
			<Flex direction="column">
				<Title order={2}>{budget.name}</Title>
				<Group gap="xs" align="center" justify="center">
					<DateRender date={budget.fromDate} />
					<IoIosArrowRoundForward />
					<DateRender date={budget.toDate} />
				</Group>
			</Flex>
			<Divider orientation="vertical" />
			<Badge size="sm">
				<RenderCurrency size="sm" amount={budget.amount} />
			</Badge>
		</Group>
	);
};
