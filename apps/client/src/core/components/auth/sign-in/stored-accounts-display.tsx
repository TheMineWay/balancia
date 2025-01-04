import defaultAvatar from "@core/assets/auth/default-avatar.jpg";
import { useTranslation } from "@core/i18n/use-translation";
import type { AuthContextInfo } from "@core/providers/auth/auth.context";
import {
  type StoredAccount,
  useStoredAccounts,
} from "@core/providers/auth/stored-account.context";
import { getGravatarUrl, getUserName, interpolate } from "@shared/utils/core";
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
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
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
  const { t } = useTranslation("auth");

  const avatarUrl = account.user.email
    ? getGravatarUrl(account.user.email)
    : defaultAvatar;

  return (
    <div
      className={styles.card}
      onClick={onPick}
      aria-description={interpolate(
        t()["stored-accounts"].display.account["Pick-aria-description"],
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
