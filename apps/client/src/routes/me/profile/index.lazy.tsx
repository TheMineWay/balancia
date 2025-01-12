import ProfileTemplate from "@core/templates/user/profile/profile.template";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/me/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProfileTemplate />
    </div>
  );
}
