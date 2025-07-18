import type { EndpointMethod } from "@/v3/types/endpoint-method.enum";
import type { ZodObject } from "zod";

type Definition = {
  method?: EndpointMethod;

  /* DTOs */
  bodyDto?: ZodObject;
  responseDto?: ZodObject;
  queryDto?: ZodObject;
};

export type EndpointDefinition = Definition & {
  getPath: () => string[];
};

export type ParametrizedEndpointDefinition<P extends Record<string, string>> =
  Definition & {
    getPath: (params: P) => string[];
    paramsMapping: Record<keyof P, string>;
  };
