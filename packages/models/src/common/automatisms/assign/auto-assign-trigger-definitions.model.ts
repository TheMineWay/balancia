import { ID_SCHEMA } from "@/common/__system/id.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

// #region Generic

/**
 * Defines how the trigger should match the field value.
 */
export enum AutoAssignTriggerMatchOption {
	EQUALS = "eq",
	CONTAINS = "contains",
}

// #endregion

// #region Field based trigger

export const AUTO_ASSIGN_TRIGGER_FIELD_MODEL_VALUES = {
	field: {
		maxLength: 64,
	},
	value: {
		maxLength: 128,
	},
} satisfies ModelValues;

/**
 * Schema to validate the field based trigger definition.
 * It defines the field to check, the match mode and the value to compare against.
 */
export const AUTO_ASSIGN_TRIGGER_FIELD_SCHEMA = z.object({
	field: z
		.string()
		.nonempty()
		.max(AUTO_ASSIGN_TRIGGER_FIELD_MODEL_VALUES.field.maxLength),
	matchMode: z.enum(AutoAssignTriggerMatchOption),
	value: z
		.string()
		.nonempty()
		.max(AUTO_ASSIGN_TRIGGER_FIELD_MODEL_VALUES.value.maxLength),
});

export type AutoAssignTriggerFieldModel = z.infer<
	typeof AUTO_ASSIGN_TRIGGER_FIELD_SCHEMA
>;

// #endregion

export enum AutoAssignTriggerType {
	FIELD = "field",
}

const FIELD_BASED = z.object({
	type: z.literal(AutoAssignTriggerType.FIELD),
	...AUTO_ASSIGN_TRIGGER_FIELD_SCHEMA.shape,
});

export const AUTO_ASSIGN_CRITERIA_SCHEMA = z.discriminatedUnion("type", [
	FIELD_BASED,
]);

export type AutoAssignCriteriaModel = z.infer<
	typeof AUTO_ASSIGN_CRITERIA_SCHEMA
>;

export type AutoAssignTriggerTypes = {
	field: AutoAssignTriggerFieldModel;
};

/* Metadata */

export const AUTO_ASSIGN_METADATA_MODEL_VALUES = {
	name: {
		maxLength: 128,
	},
	description: {
		maxLength: 1024,
	},
} satisfies ModelValues;

const AUTO_ASSIGN_METADATA_SCHEMA = z.object({
	name: z
		.string()
		.nonempty()
		.max(AUTO_ASSIGN_METADATA_MODEL_VALUES.name.maxLength),
	description: z
		.string()
		.max(AUTO_ASSIGN_METADATA_MODEL_VALUES.description.maxLength)
		.nullable()
		.default(null),
});

export type AutoAssignMetadataModel = z.infer<
	typeof AUTO_ASSIGN_METADATA_SCHEMA
>;

/* Complete models */

export const AUTO_ASSIGN_SCHEMA = z.object({
	id: ID_SCHEMA,
	...AUTO_ASSIGN_METADATA_SCHEMA.shape,
	criteria: AUTO_ASSIGN_CRITERIA_SCHEMA,
	...TIMESTAMPS_SCHEMA.shape,
});

export type AutoAssignModel = z.infer<typeof AUTO_ASSIGN_SCHEMA>;

export const AUTO_ASSIGN_CREATE_SCHEMA = AUTO_ASSIGN_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type AutoAssignCreateModel = z.infer<typeof AUTO_ASSIGN_CREATE_SCHEMA>;
