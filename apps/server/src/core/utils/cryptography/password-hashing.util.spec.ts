import { describe, expect, it } from "vitest";
import { compareHash, hash } from "./password-hashing.util";

describe("password hashing util", () => {
  describe("hash()", () => {
    it("should generate different hashes for the same input but be comparable", () => {
      const text = "example";

      const hashed1 = hash(text);
      const hashed2 = hash(text);

      expect(hashed1).not.toEqual(hashed2);
    });

    it("should generate different hashes for different inputs and not be comparable", () => {
      const text1 = "example1";
      const text2 = "example2";

      expect(hash(text1)).not.toEqual(hash(text2));
    });
  });

  describe("compareHash()", () => {
    it("should return true for matching passwords", () => {
      const password = "mypassword";

      const result = compareHash(hash(password), password);

      expect(result).toEqual(true);
    });

    it("should return false for non-matching passwords", () => {
      const password = hash("mypassword");
      const wrongPassword = "notmypassword";

      const result = compareHash(password, wrongPassword);

      expect(result).toEqual(false);
    });
  });
});
