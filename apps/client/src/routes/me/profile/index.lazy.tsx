import ProfilePageTemplate from "@core/templates/user/profile/profile.page-template";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/me/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  // No <PageContainer/> is used as it is a direct link to a page
  return <ProfilePageTemplate />;
}
