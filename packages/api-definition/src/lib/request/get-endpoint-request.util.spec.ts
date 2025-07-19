import { getEndpointRequest } from "@/lib/request/get-endpoint-request.util";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { describe, expect, it } from "vitest";
import z from "zod";

const API_URL_MOCK = "https://api.example.com";

const USER_SCHEMA = z.object({ id: z.string(), name: z.string() });

const USER_ENDPOINT = {
  getPath: (p) => ["user", p.id],
  paramsMapping: {
    id: "id",
  },
  responseDto: USER_SCHEMA,
} satisfies EndpointDefinition<{ id: string }>;

const ALL_USERS = {
  getPath: () => [],
  paramsMapping: {},
  responseDto: z.object({
    users: z.array(USER_SCHEMA),
    count: z.number(),
  }),
} satisfies EndpointDefinition;

const USER_CONTROLLER = {
  getPath: () => ["users"],
  paramsMapping: {},
  endpoints: {
    user: USER_ENDPOINT,
  },
} satisfies ControllerDefinition;

describe("getEndpointRequest(apiUrl, controller, endpointKey, params, options) should return a valid config when given a", () => {
  it("GET request", () => {
    const config = getEndpointRequest(
      API_URL_MOCK,
      USER_CONTROLLER,
      "user",
      { id: "123" },
      {}
    );

    expect(config.request).toEqual({
      url: `${API_URL_MOCK}/users/user/123`,
      method: EndpointMethod.GET,
      params: undefined,
      data: undefined,
    });

    // Test if it parses
    const parsed = config.onResponse({
      id: "123",
      name: "John Doe",
      extra: "data", // should be removed
    });
    expect(parsed).toEqual({ id: "123", name: "John Doe" });
  });
});
