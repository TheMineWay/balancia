import { describe, expect, it } from "vitest";
import { ControllerDefinition } from "../types";
import { getEndpointRequest } from "./get-endpoint-request.util";

const BASE_URL = 'http://locahost:3001';

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

describe("getEndpointRequest()", () => {
    describe("when no parameters are needed", () => {
        it("should return the endpoint request", () => {
            const requestConfig = getEndpointRequest(BASE_URL, CONTROLLER, 'test1');

            expect(requestConfig.url).toBe(BASE_URL + '/test/test1');
        });
    });
});
