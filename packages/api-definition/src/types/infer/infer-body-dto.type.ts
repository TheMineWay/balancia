import { ControllerDefinition } from "@ts-types/controller-definition.type";
import z from "zod";

export type InferBodyDto<
	C extends ControllerDefinition<any>,
	E extends keyof C["endpoints"],
	D = z.infer<C["endpoints"][E]["bodyDto"]>,
> = D extends object ? D : void;
