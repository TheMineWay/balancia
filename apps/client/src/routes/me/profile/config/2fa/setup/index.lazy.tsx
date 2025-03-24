import PageContainer from "@core/components/ui/container/page-container";
import Enable2Fa from "@core/templates/user/profile/security/enable-2fa/enable-2fa.template";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/me/profile/config/2fa/setup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <Enable2Fa />
    </PageContainer>
  );
}
