import { SignInButton } from "@common/core/auth/components/actions/sign-in-button";
import { useOidcState } from "@common/core/auth/hooks/use-oidc-state";
import { Button, Modal } from "@mantine/core";
import { format, fromUnixTime } from "date-fns";

export const TokenExpiracyModal: FC = () => {
  const { isTokenExpired, user } = useOidcState();

  return (
    <>
      {format(fromUnixTime(user?.expires_at ?? 0), "dd/MM/yyyy HH:mm:ss")}
      <Button
        onClick={() => {
          console.log(user?.access_token);
        }}
      ></Button>
      <Modal opened={isTokenExpired} onClose={() => {}}>
        <SignInButton />
      </Modal>
    </>
  );
};
