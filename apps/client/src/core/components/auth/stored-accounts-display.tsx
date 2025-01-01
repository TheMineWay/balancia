import { AuthContextInfo } from "@core/providers/auth/auth.provider";
import {
  type Account,
  useStoredAccounts,
} from "@core/providers/auth/stored-accounts.provider";
import { getGravatarUrl, getUserName } from "@shared/utils";
import { Card } from "antd";

type Props = {
  onSuccess: (authContext: AuthContextInfo) => void;
};

export default function StoredAccountsDisplay({ onSuccess }: Readonly<Props>) {
  const { accounts } = useStoredAccounts();

  return (
    <div className="flex gap-4">
      {Object.values(accounts).map((account) => (
        <Account
          account={account}
          key={account.user.id}
          onPick={() => onSuccess(account)}
        />
      ))}
    </div>
  );
}

const Account = ({
  account,
  onPick,
}: {
  account: Account;
  onPick: () => void;
}) => {
  const avatarUrl = account.user.email
    ? getGravatarUrl(account.user.email)
    : "https://http.cat/images/102.jpg";

  return (
    <Card
      styles={{
        body: {
          padding: 0,
        },
      }}
      onClick={onPick}
    >
      <img className="h-36 w-36 rounded-t-lg" alt="avatar" src={avatarUrl} />
      <p className="text-center py-2">{getUserName(account.user)}</p>
    </Card>
  );
};
