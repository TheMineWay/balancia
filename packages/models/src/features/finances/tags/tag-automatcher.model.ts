import { ID_SCHEMA } from "@/common/__system/id.model";
import {
	AUTO_ASSIGN_METADATA_MODEL_VALUES,
	GET_AUTO_ASSIGN_CRITERIA_SCHEMA,
} from "@/common/automatisms/assign/auto-assign-trigger-definitions.model";
import { TransactionModel } from "@/features/finances/transactions/transaction.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const TAG_AUTOMATCHER_ALLOWED_FIELDS = [
	"subject",
	"amount",
] satisfies (keyof TransactionModel)[];

export const TAG_AUTOMATCHER_SCHEMA = z.object({
	id: ID_SCHEMA,

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
	criteria: GET_AUTO_ASSIGN_CRITERIA_SCHEMA({
		fields: TAG_AUTOMATCHER_ALLOWED_FIELDS,
	}),

	...TIMESTAMPS_SCHEMA.shape,
});

export type TagAutomatcherModel = z.infer<typeof TAG_AUTOMATCHER_SCHEMA>;

export const TAG_AUTOMATCHER_CREATE_SCHEMA = TAG_AUTOMATCHER_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type TagAutomatcherCreateModel = z.infer<
	typeof TAG_AUTOMATCHER_CREATE_SCHEMA
>;
