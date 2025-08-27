import { ID_SCHEMA } from "@/common/__system/id.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const CATEGORY_MODEL_VALUES = {
	name: {
		maxLength: 100,
	},
	description: {
		maxLength: 512,
	},
} satisfies ModelValues;

export const CATEGORY_SCHEMA = z.object({
	id: ID_SCHEMA,
	name: z.string().max(CATEGORY_MODEL_VALUES.name.maxLength),
	description: z
		.string()
		.max(CATEGORY_MODEL_VALUES.description.maxLength)
		.nullable()
		.default(null),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type CategoryModel = z.infer<typeof CATEGORY_SCHEMA>;

/* Create */
export const CATEGORY_CREATE_SCHEMA = CATEGORY_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type CategoryCreateModel = z.infer<typeof CATEGORY_CREATE_SCHEMA>;
