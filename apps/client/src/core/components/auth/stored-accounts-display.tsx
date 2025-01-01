import {
  type Account,
  useStoredAccounts,
} from "@core/providers/auth/stored-accounts.provider";
import { getGravatarUrl } from "@shared/utils";

export default function StoredAccountsDisplay() {
  const { accounts } = useStoredAccounts();

  return (
    <div className="flex gap-4">
      {Object.values(accounts).map((account) => (
        <Account account={account} key={account.user.id} />
      ))}
    </div>
  );
}

const Account = ({ account }: { account: Account }) => {
  const avatarUrl = account.user.email
    ? getGravatarUrl(account.user.email)
    : "https://http.cat/images/102.jpg";

  return (
    <div>
      <img className="h-36 w-36" alt="avatar" src={avatarUrl} />
      <p className="text-center pt-2">{account.user.name}</p>
    </div>
  );
};
