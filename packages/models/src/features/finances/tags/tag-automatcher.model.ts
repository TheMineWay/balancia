import {
	AUTO_ASSIGN_CRITERIA_SCHEMA,
	AUTO_ASSIGN_METADATA_MODEL_VALUES,
} from "@/common/automatisms/assign/auto-assign-trigger-definitions.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const TAG_AUTOMATCHER_SCHEMA = z.object({
	// Metadata
	name: z
		.string()
		.nonempty()
		.max(AUTO_ASSIGN_METADATA_MODEL_VALUES.name.maxLength),
	description: z
		.string()
		.max(AUTO_ASSIGN_METADATA_MODEL_VALUES.description.maxLength)
		.nullable()
		.default(null),

	// Matcher data
	tagId: z.number().int().positive(),
	criteria: AUTO_ASSIGN_CRITERIA_SCHEMA,

	...TIMESTAMPS_SCHEMA.shape,
});

export type TagAutomatcherModel = z.infer<typeof TAG_AUTOMATCHER_SCHEMA>;
