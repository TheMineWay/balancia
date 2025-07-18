import { EndpointMethod } from "@/v3/types/endpoint-method.enum";
import { ZodSchema } from "zod";

export type EndpointDefinition<
  P extends Record<string, string | number> = never
> = {
  method?: EndpointMethod;
  getPath: (params: P) => string;
  getDefinitionPath?: () => Record<keyof P, string>;
  dto?: ZodSchema;
  responseDto?: ZodSchema;
};
