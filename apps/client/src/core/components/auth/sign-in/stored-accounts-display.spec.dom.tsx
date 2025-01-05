import StoredAccountsDisplay from "@core/components/auth/sign-in/stored-accounts-display";
import { AuthContextInfo } from "@core/providers/auth/auth.context";
import StoredAccountsProvider from "@core/providers/auth/stored-accounts.provider";
import LanguageProvider from "@core/providers/language/language.provider";
import { USERS_MOCK } from "@shared/mocks";
import { UserModel } from "@shared/models";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

const LOCAL_STORAGE_KEY = "accounts";

type Options = {
  onSuccess?: (info: AuthContextInfo) => void;
};

const renderComponent = ({ onSuccess = () => {} }: Options = {}) => {
  return render(
    <LanguageProvider>
      <StoredAccountsProvider>
        <StoredAccountsDisplay onSuccess={onSuccess} />
      </StoredAccountsProvider>
    </LanguageProvider>
  );
};

const findByUser = (user: UserModel) =>
  screen.findByText(user.name + " " + user.lastName);

describe("<StoredAccountsDisplay/>", () => {
  beforeEach(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
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
      })
    );
  });

  it("should display accounts stored in the browser", async () => {
    renderComponent();

    for (const user of [USERS_MOCK.alice, USERS_MOCK.john]) {
      const nameElement = await findByUser(user);
      expect(nameElement).toBeDefined();
    }
  });

  it("should be able to remove accounts from the browser", async () => {
    renderComponent();
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
});
