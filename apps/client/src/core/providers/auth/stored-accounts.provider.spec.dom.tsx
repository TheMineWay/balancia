import StoredAccountsProvider, {
  useStoredAccounts,
} from "@core/providers/auth/stored-accounts.provider";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const LOCAL_STORAGE_KEY = "accounts";

type Context = ReturnType<typeof useStoredAccounts>;
type OnContext = { onContext: (data: Context) => Context };

const TestComponent = (props: OnContext) => {
  const context = useStoredAccounts();

  props.onContext(context);

  return <></>;
};

const renderComponent = (options: OnContext, storageData?: object) => {
  if (storageData) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageData));
  }

  render(
    <StoredAccountsProvider>
      <TestComponent onContext={options.onContext} />
    </StoredAccountsProvider>
  );
};

describe("<StoredAccountsProvider/>", () => {
  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  describe("when there are stored accounts", () => {
    it("should return accounts", () => {
      const accounts: Context["accounts"] = {
        1: {
          user: {
            id: 1,
            name: "John",
            lastName: "Doe",
            username: "john",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          token: "",
          grantedAt: new Date(),
        },
      };

      let context: Context | undefined;
      renderComponent({ onContext: (c) => (context = c) }, accounts);

      expect(context?.accounts).toEqual(accounts);
    });

    it("should clear storage and return an empty object if data is corrupted", () => {
      let context: Context | undefined;
      renderComponent(
        { onContext: (c) => (context = c) },
        { corrupted: "unkonwn field" }
      );

      expect(context?.accounts).toEqual({});
    });
  });

  it("when there are no accounts it should return an empty object", () => {
    let context: Context | undefined;
    renderComponent({ onContext: (c) => (context = c) });

    expect(context?.accounts).toEqual({});
  });
});
