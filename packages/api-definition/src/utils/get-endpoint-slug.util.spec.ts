import { describe, expect, it } from "vitest";
import { ControllerDefinition, EndpointDefinition } from "../types";
import { getEndpointSlug } from "./get-endpoint-slug.util";

const CONTROLLER: ControllerDefinition = {
  getName: () => "test",
  endpoints: {
    test1: {
      getPath: () => "test1",
    },
    test2: {
      getPath: (params: { name: string }) => `test2/${params.name}`,
    },
  },
};

describe("getEndpointSlug()", () => {
  describe("when no parameters are needed", () => {
    it("should return the endpoint name", () => {
      const name = getEndpointSlug(CONTROLLER, "test1");

      expect(name).toBe("test1");
    });
  });

  describe("when parameters are needed", () => {
    it("should return the endpoint name with parameters", () => {
      const endpoint: EndpointDefinition = {
        getPath: (params: { name: string }) => `test2/${params.name}`,
      };

      const name = getEndpointSlug(CONTROLLER, "test2", { name: "test-param" });

      expect(name).toBe(`test2/test-param`);
    });

    it("should fail when required parameters are not provided", () => {
      const endpoint: EndpointDefinition = {
        getPath: (params: { name: string }) => `test2/${params.name}`,
      };

      expect(() => getEndpointSlug(CONTROLLER, "test2")).toThrowError();
    });
  });
});
