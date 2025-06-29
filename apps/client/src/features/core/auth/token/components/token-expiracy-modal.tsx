import { SignInButton } from "@common/core/auth/components/actions/sign-in-button";
import { useOidcState } from "@common/core/auth/hooks/use-oidc-state";
import { Modal } from "@mantine/core";

export const TokenExpiracyModal: FC = () => {
  const { isTokenExpired } = useOidcState();

  return (
    <Modal opened={isTokenExpired} onClose={() => {}}>
      <SignInButton />
    </Modal>
  );
};
