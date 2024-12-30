import { USER_SCHEMA } from "@shared/models";
import { WithChildren } from "@ts-types/common/component.types";
import { createContext, useContext, useState } from "react";
import { object, string, z } from "zod";

const LOCAL_STORAGE_KEY = "accounts";

const ACCOUNT_SCHEMA = object({
  user: USER_SCHEMA,
  token: string(),
  grantedAt: string().transform((val) => new Date(val)),
});

const ACCOUNTS_SCHEMA = z.record(ACCOUNT_SCHEMA);

type Account = z.infer<typeof ACCOUNT_SCHEMA>;
type ContextType = {
  accounts: Record<number, Account>;
  addAccount: (account: Omit<Account, "grantedAt">) => void;
  removeAccount: (id: number) => void;
  findAccount: (id: number) => Account | undefined;
};

const Context = createContext<ContextType>(null!);

type Props = WithChildren;

export default function StoredAccountsProvider({ children }: Readonly<Props>) {
  const [accounts, setAccounts] =
    useState<Record<number, Account>>(readStoredAccounts());

  const addAccount = (account: Omit<Account, "grantedAt">) => {
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
    <Context.Provider
      value={{ accounts, addAccount, removeAccount, findAccount }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStoredAccounts = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error(
      "useStoredAccounts must be used within a StoredAccountsProvider"
    );

  return context;
};

/* LOCAL STORAGE UTILS */

const readStoredAccounts = () => {
  try {
    const storedAccounts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedAccounts) return {};

    return ACCOUNTS_SCHEMA.parse(JSON.parse(storedAccounts));
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return {};
  }
};

const addStoredAccount = (account: Account) => {
  const storedAccounts = readStoredAccounts();
  storedAccounts[account.user.id] = account;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAccounts));
};

const removeStoredAccount = (id: number) => {
  console.log("remove");
  const storedAccounts = readStoredAccounts();
  const account = storedAccounts[id];

  if (!account) return;

  delete storedAccounts[account.user.id];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAccounts));
};
