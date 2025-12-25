import { MyBudgetSegmentsDashboard } from "@fts/finances/budgets/my-budget-segments/components/dashboard/my-budget-segments-dashboard";
import { useMyBudgetByIdQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budget-by-id.query";
import { createLazyFileRoute, notFound } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/finances/budgets/segments/$segment-id/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { "segment-id": rawSegmentId } = Route.useParams();
	const segmentId = Number(rawSegmentId);

	if (Number.isNaN(segmentId)) throw new Error("Invalid segment ID");

	const { data: budget, isLoading } = useMyBudgetByIdQuery(segmentId);

	if (isLoading) return null;
	if (!budget) throw notFound();

	return <MyBudgetSegmentsDashboard budget={budget} />;
}
