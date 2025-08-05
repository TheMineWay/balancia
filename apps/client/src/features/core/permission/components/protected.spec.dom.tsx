import { Protected } from "@core-fts/permission/components/protected";
import { Permission } from "@shared/models";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/auth/user-info.context", () => ({
  useUserInfo: () => ({
    permissions: [Permission.ADMIN],
  }),
}));

const ALLOWED_TEXT = "ALLOWED";

const renderComponent = (permissions: Permission[]) => {
  render(
    <Protected permissions={permissions}>
      <p>{ALLOWED_TEXT}</p>
    </Protected>
  );
};

const renderWithUserPermissions = (userPermissions: Permission[]) => {
  renderComponent([Permission.ADMIN]);
};

describe("<Protected/>", () => {
  describe("should render children when user", () => {
    it("has all required permissions", () => {
      renderWithUserPermissions([Permission.ADMIN]);
      expect(screen.findByText(ALLOWED_TEXT)).toBeDefined();
    });
  });

  describe("should not render children when user", () => {
    it("does not have all required permissions", () => {});
    it("does not have any required permissions", () => {});
    it("has no permissions at all", () => {});
  });
});
