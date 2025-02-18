import { z, ZodSchema } from "zod";
import { ControllerDefinition } from "./controller-definition.type";

export type InferEndpointDTO<C extends ControllerDefinition, K extends keyof C['endpoints']> =
    C['endpoints'][K]['dto'] extends ZodSchema ? z.infer<C['endpoints'][K]['dto']> : never;