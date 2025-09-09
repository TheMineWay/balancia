import { ID_SCHEMA } from "@/common/__system/id.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const TAG_MODEL_VALUES = {
	name: {
		maxLength: 64,
	},
	description: {
		maxLength: 256,
	},
} satisfies ModelValues;

export const TAG_SCHEMA = z.object({
	id: ID_SCHEMA,
	name: z.string().nonempty().max(TAG_MODEL_VALUES.name.maxLength),
	description: z
		.string()
		.max(TAG_MODEL_VALUES.description.maxLength)
		.nullable()
		.default(null),

	...TIMESTAMPS_SCHEMA.shape,
});

export type TagModel = z.infer<typeof TAG_SCHEMA>;

/* Create */
export const TAG_CREATE_SCHEMA = TAG_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type TagCreateModel = z.infer<typeof TAG_CREATE_SCHEMA>;
