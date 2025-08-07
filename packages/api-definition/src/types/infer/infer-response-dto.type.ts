import { ControllerDefinition } from "@ts-types/controller-definition.type";
import z from "zod";

export type InferResponseDto<
	C extends ControllerDefinition<any>,
	E extends keyof C["endpoints"],
	D = z.infer<C["endpoints"][E]["responseDto"]>,
> = D extends object ? D : void;
