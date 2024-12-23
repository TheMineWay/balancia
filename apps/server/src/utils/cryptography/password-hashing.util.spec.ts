import { describe, expect, it } from "vitest";
import {
  compareHash,
  compareHashWithSalt,
  hash,
  hashWithSalt,
} from "./password-hashing.util";

describe("password hashing util", () => {
  describe("hash()", () => {
    it("should generate a consistent hash for the same input", () => {
      const text = "example";
      const hashed1 = hash(text);
      const hashed2 = hash(text);

      expect(hashed1).toEqual(hashed2);
    });

    it("should generate different hashes for different inputs", () => {
      const text1 = "example1";
      const text2 = "example2";

      expect(hash(text1)).not.toEqual(hash(text2));
    });
  });

  describe("hashWithSalt()", () => {
    it("should generate a hash with a salt included", () => {
      const password = "mypassword";
      const saltedHash = hashWithSalt(password);

      expect(saltedHash).toMatch(/^[^:]+:[^:]+$/); // Format: salt:hash
    });

    it("should generate different salted hashes for the same password", () => {
      const password = "mypassword";
      const saltedHash1 = hashWithSalt(password);
      const saltedHash2 = hashWithSalt(password);

      expect(saltedHash1).not.toEqual(saltedHash2); // Salt randomness ensures different hashes
    });
  });

  describe("compareHash()", () => {
    it("should return true for matching passwords", () => {
      const password = "mypassword";

      const result = compareHash(password, password);

      expect(result).toBe(true);
    });

    it("should return false for non-matching passwords", () => {
      const password = "mypassword";
      const wrongPassword = "notmypassword";

      const result = compareHash(password, wrongPassword);

      expect(result).toBe(false);
    });
  });

  describe("compareHashWithSalt()", () => {
    it("should return true for a correct password and salted hash", () => {
      const password = "mypassword";
      const saltedHash = hashWithSalt(password);

      const result = compareHashWithSalt(saltedHash, password);

      expect(result).toBe(true);
    });

    it("should return false for an incorrect password and salted hash", () => {
      const password = "mypassword";
      const wrongPassword = "notmypassword";
      const saltedHash = hashWithSalt(password);

      const result = compareHashWithSalt(saltedHash, wrongPassword);

      expect(result).toBe(false);
    });
  });
});
