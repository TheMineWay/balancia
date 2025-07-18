import { describe, expect, it } from "vitest";
import type {
  EndpointDefinition,
  ParametrizedEndpointDefinition,
} from "../types/endpoint-definition.type";
import {
  getEndpointPath,
  getEndpointPathWithParams,
} from "./get-endpoint-path.util";

const STATIC_ENDPOINT = {
  getPath: () => ["status", "health"],
} satisfies EndpointDefinition;

const DYNAMIC_ENDPOINT = {
  getPath: (params) => ["users", params.id],
  paramsMapping: {
    id: "userId",
  },
} satisfies ParametrizedEndpointDefinition<{ id: string }>;

describe("getEndpointPath(endpoint)", () => {
  it("should return path given an endpoint", () => {
    const path = getEndpointPath(STATIC_ENDPOINT);
    expect(path).toBe("status/health");
  });
});

describe("getEndpointPathWithParams(endpoint)", () => {
  it("should return path with params given a parametrized endpoint", () => {
    const path = getEndpointPathWithParams(DYNAMIC_ENDPOINT, { id: "123" });
    expect(path).toBe("users/123");
  });
});
