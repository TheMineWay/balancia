import StoredAccountsDisplay from "@core/components/auth/sign-in/stored-accounts-display";
import { AuthContextInfo } from "@core/providers/auth/auth.context";
import StoredAccountsProvider from "@core/providers/auth/stored-accounts.provider";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it } from "vitest";

const LOCAL_STORAGE_KEY = "accounts";

type Options = {
  onSuccess?: (info: AuthContextInfo) => void;
};

const renderComponent = ({ onSuccess = () => {} }: Options = {}) => {
  return render(
    <StoredAccountsProvider>
      <StoredAccountsDisplay onSuccess={onSuccess} />
    </StoredAccountsProvider>
  );
};

describe("<StoredAccountsDisplay/>", () => {
  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
  });

  it("should display accounts stored in the browser", async () => {
    renderComponent();

    await screen.findByText("");
  });
});
