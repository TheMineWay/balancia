import { describe, expect, it } from "vitest";
import { ControllerDefinition } from "../types";
import { getController } from "./get-controller.util";

const TEST_NAME = "controller-name";

describe("getController()", () => {
  describe("when no parameters are needed", () => {
    it("should return the controller name", () => {
      const controller: ControllerDefinition = {
        getName: () => TEST_NAME,
        endpoints: {},
      };

      const name = getController(controller);

      expect(name).toBe(TEST_NAME);
    });
  });

  describe("when parameters are needed", () => {
    it("should return the controller name with parameters", () => {
      const controller: ControllerDefinition = {
        getName: (params: { name: string }) => `${TEST_NAME}/${params.name}`,
        endpoints: {},
      };

      const name = getController(controller, { name: "test-param" });

      expect(name).toBe(`${TEST_NAME}/test-param`);
    });

    it("should fail when required parameters are not provided", () => {
      const controller: ControllerDefinition = {
        getName: (params: { name: string }) => `${TEST_NAME}/${params.name}`,
        endpoints: {},
      };

      expect(() => getController(controller)).toThrowError();
    });
  });
});
