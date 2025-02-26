import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { ZodSchema } from "zod";

export type EndpointDefinition = {
  method?: EndpointMethod;
  getPath: (params: any) => string;
  dto?: ZodSchema;
  responseDto?: ZodSchema;
};
