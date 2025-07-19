import type { EndpointMethod } from "@ts-types/endpoint-method.enum";
import type { ZodObject } from "zod";

export type EndpointDefinition<P extends Record<string, string> = {}> = {
  method?: EndpointMethod;

  /* DTOs */
  bodyDto?: ZodObject;
  responseDto?: ZodObject;
  queryDto?: ZodObject;

  /* Path */
  getPath: (params: P) => string[];
  paramsMapping: Record<keyof P, string>;
};
