import { AuthService } from "@core/auth/auth.service";
import { JWT_SERVICE_MOCK } from "@mocks/core/auth/jwt-service.mock";
import { USER_SERVICE_MOCK } from "@mocks/core/user/user-service.mock";
import { USERS_MOCK } from "@mocks/core/user/users.mock";
import { UnauthorizedException } from "@nestjs/common";
import { beforeEach, describe, expect, it } from "vitest";

describe("Auth service", () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(USER_SERVICE_MOCK, JWT_SERVICE_MOCK);
  });

  describe("should throw an exception when", () => {
    it("the user does not exist", () => {
      expect(
        async () =>
          await authService.signIn({ username: "unexisting", password: "1234" })
      ).rejects.toThrowError(UnauthorizedException);
    });

    it("password is incorrect", () => {
      expect(
        async () =>
          await authService.signIn({
            username: USERS_MOCK["john.doe"].username,
            password: "wrong",
          })
      ).rejects.toThrowError(UnauthorizedException);
    });

    it("password is correct but TOTP code is required and not provided", () => {
      expect(
        async () =>
          await authService.signIn({
            username: USERS_MOCK["alice.smith"].username,
            password: "1234",
          })
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe("should return a valid token when", () => {
    it("the valid password and username are provided", async () => {
      const { token } = await authService.signIn({
        username: "john.doe",
        password: "1234",
      });

      expect(token).toEqual("VALID TOKEN");
    });
  });
});
