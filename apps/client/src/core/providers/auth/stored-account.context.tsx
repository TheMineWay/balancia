import { USER_SCHEMA } from "@shared/models";
import { createContext, useContext } from "react";
import { object, string, z } from "zod";

export const STORED_ACCOUNT_SCHEMA = object({
  user: USER_SCHEMA,
  token: string(),
  grantedAt: string().transform((val) => new Date(val)),
});

export const STORED_ACCOUNTS_SCHEMA = z.record(STORED_ACCOUNT_SCHEMA);

export type StoredAccount = z.infer<typeof STORED_ACCOUNT_SCHEMA>;
type ContextType = {
  accounts: Record<number, StoredAccount>;
  addAccount: (account: Omit<StoredAccount, "grantedAt">) => void;
  removeAccount: (id: number) => void;
  findAccount: (id: number) => StoredAccount | undefined;
};

export const STORED_ACCOUNTS_CONTEXT = createContext<ContextType>(null!);

export const useStoredAccounts = () => {
  const context = useContext(STORED_ACCOUNTS_CONTEXT);

  if (!context)
    throw new Error(
      "useStoredAccounts must be used within a StoredAccountsProvider"
    );

  return context;
};
