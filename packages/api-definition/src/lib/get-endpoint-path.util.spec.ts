import { describe, expect, it } from "vitest";
import type { EndpointDefinition } from "../types/endpoint-definition.type";
import { getEndpointPath } from "./get-endpoint-path.util";

const ENDPOINT = {
  getPath: (params) => ["users", params.id],
  paramsMapping: {
    id: "userId",
  },
} as const satisfies EndpointDefinition<{ id: string }>;

describe("getEndpointPath(endpoint)", () => {
  it("should return path given an endpoint", () => {
    const path = getEndpointPath(ENDPOINT, { id: "123" });
    expect(path).toBe("users/123");
  });
});
