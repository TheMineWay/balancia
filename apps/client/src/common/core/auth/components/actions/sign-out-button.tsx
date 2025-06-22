import { useLogout } from "@common/core/auth/hooks/use-logout";
import { ENV } from "@constants/env/env.constant";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "antd";

type Props = {
  onSuccess?: CallableFunction;
};

export const SignOutButton: FC<Props> = () => {
  const { interpolated } = useTranslation("auth");
  const { logout, isLoggingOut } = useLogout();

  return (
    <Button
      color={ENV.auth.ui.providerColor}
      type="primary"
      onClick={logout}
      loading={isLoggingOut}
    >
      {interpolated((t) => t.actions.Logout)}
    </Button>
  );
};
