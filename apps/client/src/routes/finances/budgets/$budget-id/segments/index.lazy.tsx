import { MyBudgetSegmentsDashboard } from "@fts/finances/budgets/my-budget-segments/components/dashboard/my-budget-segments-dashboard";
import { useMyBudgetByIdQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budget-by-id.query";
import { createLazyFileRoute, notFound } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/finances/budgets/$budget-id/segments/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { "budget-id": rawBudgetId } = Route.useParams();
	const budgetId = Number(rawBudgetId);

	if (Number.isNaN(budgetId)) throw new Error("Invalid budget ID");

	const { data: budget, isLoading } = useMyBudgetByIdQuery(budgetId);

	if (isLoading) return null;
	if (!budget) throw notFound();

	return <MyBudgetSegmentsDashboard budget={budget} />;
}
