import { Protected } from "@core-fts/permission/components/protected";
import { Permission } from "@shared/models";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";

vi.mock("@providers/auth/user-info.context", () => ({
  useUserInfo: vi.fn(),
}));

import { useUserInfo } from "@providers/auth/user-info.context";

const ALLOWED_TEXT = "ALLOWED";

const renderComponent = (permissions: Permission[]) => {
  render(
    <Protected permissions={permissions}>
      <div data-testid={ALLOWED_TEXT} />
    </Protected>
  );
};

const renderWithUserPermissions = (userPermissions: Permission[]) => {
  (useUserInfo as Mock).mockReturnValue({
    permissions: [...userPermissions],
  });

  renderComponent([Permission.ADMIN]);
};

describe("<Protected/>", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("should render children when user", () => {
    it("has all required permissions", () => {
      renderWithUserPermissions([Permission.ADMIN]);
      expect(screen.queryByTestId(ALLOWED_TEXT)).not.toBeNull();
    });
  });

  describe("should not render children when user", () => {
    it("does not have all required permissions", () => {
      renderWithUserPermissions([]);
      expect(screen.queryByTestId(ALLOWED_TEXT)).toBeNull();
    });

    // Should be updated when there are more permissions
    it("does not have any required permissions", () => {
      renderWithUserPermissions([]);
      expect(screen.queryByTestId(ALLOWED_TEXT)).toBeNull();
    });

    // Should be updated when there are more permissions
    it("has no permissions at all", () => {
      renderWithUserPermissions([]);
      expect(screen.queryByTestId(ALLOWED_TEXT)).toBeNull();
    });
  });
});
