import { ID_SCHEMA } from "@/common/__system/id.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const ACCOUNT_MODEL_VALUES = {
	name: {
		maxLength: 64,
	},
	description: {
		maxLength: 512,
	},
} satisfies ModelValues;

export const ACCOUNT_SCHEMA = z.object({
	id: ID_SCHEMA,
	name: z.string().nonempty().max(ACCOUNT_MODEL_VALUES.name.maxLength),
	description: z
		.string()
		.max(ACCOUNT_MODEL_VALUES.description.maxLength)
		.nullable()
		.default(null),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type AccountModel = z.infer<typeof ACCOUNT_SCHEMA>;

/* Create */

export const ACCOUNT_CREATE_SCHEMA = ACCOUNT_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type AccountCreateModel = z.infer<typeof ACCOUNT_CREATE_SCHEMA>;
