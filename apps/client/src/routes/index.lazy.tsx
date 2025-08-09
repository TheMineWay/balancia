import { metadata } from "@constants/metadata.constant";
import { useActiveAuth } from "@core/auth/session/hooks/use-active-auth";
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
