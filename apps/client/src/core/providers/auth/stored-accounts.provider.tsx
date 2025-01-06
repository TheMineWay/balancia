import {
  STORED_ACCOUNTS_CONTEXT,
  STORED_ACCOUNTS_SCHEMA,
  StoredAccount,
} from "@core/providers/auth/stored-account.context";
import { WithChildren } from "@core/types/common/component.types";
import { useState } from "react";

const LOCAL_STORAGE_KEY = "accounts";

type Props = WithChildren;

export default function StoredAccountsProvider({ children }: Readonly<Props>) {
  const [accounts, setAccounts] =
    useState<Record<number, StoredAccount>>(readStoredAccounts());

  const addAccount = (account: Omit<StoredAccount, "grantedAt">) => {
    const accountData = { ...account, grantedAt: new Date() };
    addStoredAccount(accountData);
    setAccounts((prev) => ({ ...prev, [account.user.id]: accountData }));
  };

  const removeAccount = (id: number) => {
    const storedAccounts = readStoredAccounts();
    const account = Object.values(storedAccounts).find(
      (account) => account.user.id === id
    );

    if (!account) return;

    delete storedAccounts[account.user.id];
    removeStoredAccount(id);
    setAccounts({ ...storedAccounts });
  };

  const findAccount = (id: number) => {
    return accounts[id];
  };

  return (
    <STORED_ACCOUNTS_CONTEXT.Provider
      value={{ accounts, addAccount, removeAccount, findAccount }}
    >
      {children}
    </STORED_ACCOUNTS_CONTEXT.Provider>
  );
}

/* LOCAL STORAGE UTILS */

const readStoredAccounts = () => {
  try {
    const storedAccounts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedAccounts) return {};

    return STORED_ACCOUNTS_SCHEMA.parse(JSON.parse(storedAccounts));
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return {};
  }
};

const addStoredAccount = (account: StoredAccount) => {
  const storedAccounts = readStoredAccounts();
  storedAccounts[account.user.id] = account;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAccounts));
};

const removeStoredAccount = (id: number) => {
  const storedAccounts = readStoredAccounts();
  const account = storedAccounts[id];

  if (!account) return;

  delete storedAccounts[account.user.id];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAccounts));
};
