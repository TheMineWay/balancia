import { useActiveAuth } from "@common/core/auth/session/hooks/use-active-auth";
import { metadata } from "@constants/metadata.constant";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const { activeUser } = useActiveAuth();

	return (
		<div className="p-2">
			<h3>
				Hi {activeUser.profile.name}, welcome to {metadata.projectName}!
			</h3>
		</div>
	);
}
