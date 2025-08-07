import { evaluatePermissionCondition } from "@core-fts/permission/lib/evaluate-permission-condition.util";
import { Permission } from "@shared/models";
import { describe, expect, it } from "vitest";

/**
 * Some tests should be updated when more permissions are added.
 */

describe("evaluatePermissionCondition(options) when using", () => {
  describe("simple condition", () => {
    it("should return true if user has all permissions", () => {
      expect(
        evaluatePermissionCondition([Permission.ADMIN], {
          type: "simple",
          permissions: [Permission.ADMIN],
        })
      ).toBeTruthy();
    });
    it("should return false if user does not have all permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "simple",
          permissions: [Permission.ADMIN],
        })
      ).toBeFalsy();
    });
    it("should return false if user has none of the permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "simple",
          permissions: [Permission.ADMIN],
        })
      ).toBeFalsy();
    });
    it("should return false if the user has no permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "simple",
          permissions: [Permission.ADMIN],
        })
      ).toBeFalsy();
    });
  });

  describe("composite condition", () => {
    it("should return true if user has all permissions", () => {
      expect(
        evaluatePermissionCondition([Permission.ADMIN], {
          type: "composite",
          or: [[Permission.ADMIN]],
        })
      ).toBeTruthy();
    });
    it("should return false if user does not have all permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "composite",
          or: [[Permission.ADMIN]],
        })
      ).toBeFalsy();
    });
    it("should return false if user has none of the permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "composite",
          or: [[Permission.ADMIN]],
        })
      ).toBeFalsy();
    });
    it("should return false if the user has no permissions", () => {
      expect(
        evaluatePermissionCondition([], {
          type: "composite",
          or: [[Permission.ADMIN]],
        })
      ).toBeFalsy();
    });
  });
});
