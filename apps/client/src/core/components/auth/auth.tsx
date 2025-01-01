import AuthWithPasswordForm from "@core/components/auth/forms/with-password/auth-with-password.form";
import StoredAccountsDisplay from "@core/components/auth/stored-accounts-display";
import { AuthContextInfo } from "@core/providers/auth/auth.provider";
import { useStoredAccounts } from "@core/providers/auth/stored-accounts.provider";
import { Card } from "antd";
import clsx from "clsx";
import styles from "./auth.module.pcss";

type Props = {
  setAuthContext: (info: AuthContextInfo) => void;
};

export default function Auth({ setAuthContext }: Readonly<Props>) {
  const { accounts } = useStoredAccounts();

  const hasLoginProfiles = Object.keys(accounts).length > 0;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={clsx(
          styles.container,
          "flex flex-col lg:flex-row items-center lg:justify-between"
        )}
      >
        {hasLoginProfiles && (
          <div className="w-full lg:w-1/2 flex items-center justify-center mb-4 lg:mb-0">
            <StoredAccountsDisplay onSuccess={setAuthContext} />
          </div>
        )}
        <div
          className={
            hasLoginProfiles ? "w-full lg:w-1/2" : "w-full lg:w-1/2 mx-auto"
          }
        >
          <Card className="w-full">
            <AuthWithPasswordForm onSuccess={setAuthContext} />
          </Card>
        </div>
      </div>
    </div>
  );
}
