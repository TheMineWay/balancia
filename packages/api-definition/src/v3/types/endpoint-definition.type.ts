import type { EndpointMethod } from "@/v3/types/endpoint-method.enum";
import type { Params } from "@/v3/types/params.type";
import type { ZodObject } from "zod";

export type EndpointDefinition<P extends Record<string, string> | null = null> =
  Params<P> & {
    method?: EndpointMethod;

    /* DTOs */
    bodyDto?: ZodObject;
    responseDto?: ZodObject;
    queryDto?: ZodObject;
  };
