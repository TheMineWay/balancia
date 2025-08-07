import { describe, expect, it } from "vitest";
import type { EndpointDefinition } from "../types/endpoint-definition.type";
import { getPath } from "./get-path.util";

const ENDPOINT = {
	getPath: (params) => ["users", params.id],
	paramsMapping: {
		id: "userId",
	},
} as const satisfies EndpointDefinition<{ id: string }>;

describe("getPath(endpoint)", () => {
	it("should return path given an endpoint", () => {
		const path = getPath(ENDPOINT, { id: "123" });
		expect(path).toBe("users/123");
	});
});
