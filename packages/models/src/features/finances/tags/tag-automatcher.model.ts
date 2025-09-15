import { AUTO_ASSIGN_CRITERIA_SCHEMA } from "@/common/automatisms/assign/auto-assign-trigger-definitions.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const TAG_AUTOMATCHER_SCHEMA = z.object({
	tagId: z.number().int().positive(),
	criteria: AUTO_ASSIGN_CRITERIA_SCHEMA,

	...TIMESTAMPS_SCHEMA.shape,
});

export type TagAutomatcherModel = z.infer<typeof TAG_AUTOMATCHER_SCHEMA>;
