import { ENV } from "@constants/env/env.constant";
import { useOidcAuth } from "@core-fts/auth/hooks/use-oidc-auth";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "antd";

type Props = {
  onSuccess?: CallableFunction;
};

const SignInButton: FC<Props> = () => {
  const { interpolated } = useTranslation("auth");
  const { login, isAuthenticating } = useOidcAuth();

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
      {interpolated((t) => t.forms.authentik.Login, {
        name: ENV.auth.ui.providerName,
      })}
    </Button>
  );
};

export default SignInButton;
