import defaultAvatar from "@core/assets/auth/default-avatar.jpg";
import { useTranslation } from "@core/i18n/use-translation";
import type { AuthContextInfo } from "@core/providers/auth/auth.context";
import {
  type StoredAccount,
  useStoredAccounts,
} from "@core/providers/auth/stored-account.context";
import { getGravatarUrl, getUserName } from "@shared/utils";
import { Button } from "antd";
import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./stored-accounts-display.module.pcss";

type Props = {
  onSuccess: (authContext: AuthContextInfo) => void;
};

export default function StoredAccountsDisplay({ onSuccess }: Readonly<Props>) {
  const { accounts, removeAccount } = useStoredAccounts();

  return (
    <div className="w-full flex gap-4 md:justify-center flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-hidden pb-6 lg:pb-0">
      {Object.values(accounts).map((account) => (
        <Account
          account={account}
          key={account.user.id}
          onPick={() => onSuccess(account)}
          onRemove={() => removeAccount(account.user.id)}
        />
      ))}
    </div>
  );
}

const Account = ({
  account,
  onPick,
  onRemove,
}: {
  account: StoredAccount;
  onPick: () => void;
  onRemove: () => void;
}) => {
  const { interpolated } = useTranslation("auth");

  const avatarUrl = account.user.email
    ? getGravatarUrl(account.user.email)
    : defaultAvatar;

  return (
    <div
      className={styles.card}
      onClick={onPick}
      aria-description={interpolated(
        (t) => t["stored-accounts"].display.account["Pick-aria-description"],
        { name: getUserName(account.user) }
      )}
    >
      <div className={clsx(styles.avatar, "h-36 w-36")}>
        <Button
          icon={<AiOutlineClose />}
          className="absolute top-1 left-1 text-white"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          type="link"
        />
        <img className={"object-cover"} alt="avatar" src={avatarUrl} />
      </div>
      <div className={styles.body}>
        <p className="text-center py-2">{getUserName(account.user)}</p>
      </div>
    </div>
  );
};
