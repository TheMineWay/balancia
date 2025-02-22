import StoredAccountsDisplay from "@core/components/auth/sign-in/stored-accounts-display";
import { AuthContextInfo } from "@core/providers/auth/auth.context";
import TestProviders from "@core/providers/test/test.providers";
import { USERS_MOCK } from "@shared/mocks";
import { UserModel } from "@shared/models";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vitest } from "vitest";

vitest.mock("@core/hooks/auth/use-sync-account-info", () => ({
  useSyncAccountInfo: () => {},
}));

const LOCAL_STORAGE_KEY = "accounts";
const SESSION_STORAGE_KEY = "active-auth-info";

const ACCOUNTS_MOCK = {
  [USERS_MOCK.john.id]: {
    token: "...",
    grantedAt: new Date(),
    user: USERS_MOCK.john,
  },
  [USERS_MOCK.alice.id]: {
    token: "...",
    grantedAt: new Date(),
    user: USERS_MOCK.alice,
  },
};

type Options = {
  onSuccess?: (info: AuthContextInfo) => void;
};

const renderComponent = ({ onSuccess = () => {} }: Options = {}) => {
  return render(
    <TestProviders>
      <StoredAccountsDisplay onSuccess={onSuccess} />
    </TestProviders>
  );
};

const findByUser = (user: UserModel) =>
  screen.findByText(user.name + " " + user.lastName);

describe("<StoredAccountsDisplay/>", () => {
  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ACCOUNTS_MOCK));
    sessionStorage.removeItem(SESSION_STORAGE_KEY);

    renderComponent();
  });

  it("should display accounts stored in the browser", async () => {
    for (const user of [USERS_MOCK.alice, USERS_MOCK.john]) {
      const nameElement = await findByUser(user);
      expect(nameElement).toBeDefined();
    }
  });

  it("should be able to remove accounts from the browser", async () => {
    const user = USERS_MOCK.john;
    const nameElement = await findByUser(user);

    const card = nameElement?.parentNode?.parentNode;
    const closeBtn = card?.querySelector("div > button");

    expect(closeBtn).toBeDefined();

    await userEvent.click(closeBtn!);

    await waitFor(async () => {
      const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
      expect(rawData).not.toBeNull();

      const data = JSON.parse(rawData!) as Record<number, object>;

      expect(Object.keys(data)).toContain(USERS_MOCK.alice.id.toString());
      expect(Object.keys(data)).not.toContain(USERS_MOCK.john.id.toString());
    });
  });

  it("should be able to use an account when clicked", async () => {
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).toEqual(null);

    const user = USERS_MOCK.john;
    const nameElement = await findByUser(user);

    await userEvent.click(nameElement);

    const rawSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
    expect(rawSession).toBeDefined();

    const parsedSession = JSON.parse(rawSession!) as object;

    const account = ACCOUNTS_MOCK[USERS_MOCK.john.id];
    expect(parsedSession).toEqual({
      ...account,
      grantedAt: account.grantedAt.toISOString(),
      user: {
        ...account.user,
        createdAt: account.user.createdAt.toISOString(),
        updatedAt: account.user.updatedAt.toISOString(),
      },
    });
  });
});
