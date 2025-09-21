import { useMyUserPreferencesQuery } from "@common/user/preferences/api/use-my-user-preferences.query";
import { useActiveAuth } from "@core/auth/session/hooks/use-active-auth";
import { MainAnalyticsDashboard } from "@fts/analytics/my-analytics/components/dashboards/main-analytics.dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const { activeUser } = useActiveAuth();
	const { data: userPreferences } = useMyUserPreferencesQuery();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>Hi {activeUser.profile.name}</div>
			<div>
				{userPreferences?.preferences?.mainAccount && (
					<MainAnalyticsDashboard
						mainAccountId={userPreferences.preferences.mainAccount}
					/>
				)}
			</div>
		</div>
	);
}
