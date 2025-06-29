import { SignInButton } from "@common/core/auth/components/actions/sign-in-button";
import { useLogout } from "@common/core/auth/hooks/use-logout";
import { useOidcState } from "@common/core/auth/hooks/use-oidc-state";
import { Modal } from "@mantine/core";

export const TokenExpiracyModal: FC = () => {
  const { isTokenExpired } = useOidcState();
  const { logout } = useLogout();

  return (
    <Modal opened={isTokenExpired} onClose={logout}>
      <div className="flex flex-col items-center justify-center">
        <SignInButton />
      </div>
    </Modal>
  );
};
