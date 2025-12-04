import { USER_SCHEMA } from "@/core/user/user.model";
import z from "zod";

export const OWNED_SCHEMA = <T extends z.ZodObject>(schema: T) =>
	z.object({
		...schema.shape,
		userId: USER_SCHEMA.shape.id,
	});

export type OwnedModel<T extends object> = T & {
	userId: z.infer<typeof USER_SCHEMA.shape.id>;
};
