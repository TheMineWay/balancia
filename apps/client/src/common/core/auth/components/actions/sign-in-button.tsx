import { useLogin } from "@common/core/auth/hooks/use-login";
import { ENV } from "@constants/env/env.constant";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "antd";

type Props = {
  onSuccess?: CallableFunction;
};

export const SignInButton: FC<Props> = () => {
  const { interpolated } = useTranslation("auth");
  const { login, isAuthenticating } = useLogin();

  const onAuth = () => {
    login();
  };

  return (
    <Button
      color={ENV.auth.ui.providerColor}
      loading={isAuthenticating}
      type="primary"
      onClick={onAuth}
    >
      {interpolated((t) => t.actions.Login, {
        name: ENV.auth.ui.providerName,
      })}
    </Button>
  );
};
