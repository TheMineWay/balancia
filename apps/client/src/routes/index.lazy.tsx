import { metadata } from "@core/constants/metadata.constant.ts";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { activeUser } = useActiveAuth();

  return (
    <div className="p-2">
      <h3>
        Hi {activeUser.user.name}, welcome to {metadata.projectName}!
      </h3>
    </div>
  );
}
