import { EndpointDefinition } from "./endpoint-definition.type";

export type ControllerDefinition = {
  getName: (params: any) => string;
  endpoints: Record<string, EndpointDefinition<any>>;
};
