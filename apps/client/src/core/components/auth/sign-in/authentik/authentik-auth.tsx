import { ENV } from "@core/constants/env/env.constant";
import { useOidcAuth } from "@core/hooks/auth/use-oidc-auth";
import { useTranslation } from "@core/i18n/use-translation";
import { Button } from "antd";

type Props = {
  onSuccess?: CallableFunction;
};

const AuthentikAuth: FC<Props> = () => {
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

export default AuthentikAuth;
