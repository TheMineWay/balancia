import { ControllerDefinition } from "../types";

export const getEndpointDTO = <
    T extends ControllerDefinition,
    K extends keyof T["endpoints"],
>(
    controller: T,
    endpoint: K
): T['endpoints'][K]['dto'] => {
    return controller.endpoints[endpoint as string].dto;
};
