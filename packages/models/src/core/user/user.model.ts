import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import { number, object, string, z } from "zod";

export const USER_MODEL_VALUES = {
	code: {
		minLength: 4,
		maxLength: 64,
	},
	name: {
		minLength: 1,
		maxLength: 256,
	},
	username: {
		minLength: 1,
		maxLength: 128,
	},
	email: {
		minLength: 5,
		maxLength: 256,
	},
} satisfies ModelValues;

export const USER_SCHEMA = object({
	id: number(),
	code: string()
		.min(USER_MODEL_VALUES.code.minLength)
		.max(USER_MODEL_VALUES.code.maxLength),
	name: string()
		.min(USER_MODEL_VALUES.name.minLength)
		.max(USER_MODEL_VALUES.name.maxLength),
	username: string()
		.min(USER_MODEL_VALUES.username.minLength)
		.max(USER_MODEL_VALUES.username.maxLength),
	email: string()
		.min(USER_MODEL_VALUES.email.minLength)
		.max(USER_MODEL_VALUES.email.maxLength)
		.optional()
		.nullable()
		.default(null),
	...TIMESTAMPS_SCHEMA.shape,
});

export type UserModel = z.infer<typeof USER_SCHEMA>;

// Special export
export type UserModelId = UserModel["id"];
