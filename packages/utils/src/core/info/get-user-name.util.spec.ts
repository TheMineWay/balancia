import { describe, expect, it } from "vitest";
import { getUserName } from "./get-user-name.util";

describe("getUserName()", () => {
  describe("with capitalize option", () => {
    it("should capitalize name", () => {
      expect(getUserName({ name: "john" })).toBe("John");
    });

    it("should capitalize name and lastname", () => {
      expect(getUserName({ name: "john", lastName: "doe" })).toBe("John Doe");
    });
  });

  describe("without capitalize option", () => {
    it("should not capitalize name", () => {
      expect(getUserName({ name: "john" }, { capitalize: false })).toBe("john");
    });

    it("should not capitalize name and lastname", () => {
      expect(
        getUserName({ name: "john", lastName: "doe" }, { capitalize: false })
      ).toBe("john doe");
    });
  });
});
