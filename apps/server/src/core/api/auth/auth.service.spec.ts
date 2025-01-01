import { AuthService } from "@core/api/auth/auth.service";
import { AUTH_SERVICE_MOCK } from "@core/mocks/auth/auth.service.mock";
import { USERS_MOCK } from "@core/mocks/user/users.mock";
import { UnauthorizedException } from "@nestjs/common";
import { TOTP } from "otpauth";
import { beforeEach, describe, expect, it } from "vitest";

describe("Auth service", () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = AUTH_SERVICE_MOCK;
  });

  describe("should throw an exception when", () => {
    it("the user does not exist", () => {
      expect(
        async () =>
          await authService.signIn({ username: "unexisting", password: "1234" })
      ).rejects.toThrowError(UnauthorizedException);
    });

    describe("TOTP is not required and", () => {
      it("password is incorrect", () => {
        expect(
          async () =>
            await authService.signIn({
              username: USERS_MOCK["john.doe"].username,
              password: "wrong",
            })
        ).rejects.toThrowError(UnauthorizedException);
      });
    });

    describe("TOTP is required and", () => {
      it("password is incorrect", () => {
        expect(
          async () =>
            await authService.signIn({
              username: USERS_MOCK["alice.smith"].username,
              password: "wrong",
            })
        ).rejects.toThrowError(UnauthorizedException);
      });

      it("password is correct but TOTP code is not provided", () => {
        expect(
          async () =>
            await authService.signIn({
              username: USERS_MOCK["alice.smith"].username,
              password: "1234",
            })
        ).rejects.toThrowError(UnauthorizedException);
      });

      it("TOTP is correct but password is not correct", () => {
        const totp = new TOTP({
          secret: USERS_MOCK["alice.smith"].totpSecret,
        });

        expect(
          async () =>
            await authService.signIn({
              username: USERS_MOCK["alice.smith"].username,
              password: "wrong",
              totp: totp.generate(),
            })
        ).rejects.toThrowError(UnauthorizedException);
      });
    });
  });

  describe("should return a valid token when", () => {
    it("valid password and username are provided", async () => {
      const { token } = await authService.signIn({
        username: USERS_MOCK["john.doe"].username,
        password: "1234",
      });

      expect(token).toEqual("VALID TOKEN");
    });

    it("TOTP is required and valid credentials are provided", async () => {
      const totp = new TOTP({
        secret: USERS_MOCK["alice.smith"].totpSecret,
      });

      const { token } = await authService.signIn({
        username: USERS_MOCK["alice.smith"].username,
        password: "1234",
        totp: totp.generate(),
      });

      expect(token).toEqual("VALID TOKEN");
    });
  });
});
