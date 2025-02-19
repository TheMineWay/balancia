import { z, ZodSchema } from "zod";
import { ControllerDefinition } from "./controller-definition.type";

export type InferEndpointResponseDTO<
  C extends ControllerDefinition,
  K extends keyof C["endpoints"],
> = C["endpoints"][K]["responseDto"] extends ZodSchema
  ? z.infer<C["endpoints"][K]["responseDto"]>
  : never;
