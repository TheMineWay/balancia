import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { BudgetSegmentsUsageChart } from "@fts/finances/budgets/charts/budget-segments-usage.chart";
import {
	Accordion,
	Badge,
	Divider,
	Flex,
	Group,
	Text,
	Title,
} from "@mantine/core";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { BiMoney } from "react-icons/bi";
import { IoArrowForward } from "react-icons/io5";

type Props = {
	budget: BudgetModel;
	segments: BudgetSegmentModel[];
};

export const BudgetSummary: FC<Props> = ({ budget, segments }) => {
	return (
		<div className="flex flex-col gap-2 mb-4">
			{/* Budget header */}
			<Accordion>
				<Accordion.Item value="summary">
					<Accordion.Control>
						<Flex wrap="wrap" gap="sm" align="center" className="mb-2">
							<Title>{budget.name}</Title>
							<Divider orientation="vertical" />

							{/* Budget metadata */}
							<Badge size="lg">
								<Group gap="xs">
									<BiMoney />
									<RenderCurrency amount={budget.amount} />
								</Group>
							</Badge>
							<Badge variant="outline" size="sm">
								<Flex align="center">
									<DateRender
										date={budget.fromDate}
										mode="long"
										textProps={{ size: "sm" }}
									/>
									<span className="mx-1">
										<IoArrowForward />
									</span>
									<DateRender
										date={budget.toDate}
										mode="long"
										textProps={{ size: "sm" }}
									/>
								</Flex>
							</Badge>
						</Flex>
						{budget.description && <Text>{budget.description}</Text>}
					</Accordion.Control>
					<Accordion.Panel>
						{/* Segment usage chart */}
						<div className="h-20 my-2">
							<BudgetSegmentsUsageChart segments={segments} />
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};
