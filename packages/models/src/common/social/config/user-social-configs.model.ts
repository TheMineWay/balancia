/**
 * User Social Configs Model
 *
 * This model represents the user configurations related to social features. This is stored in the database.
 * A user can have 0 or 1 social configs. If the user has no social configs, the default values are used.
 */

import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const USER_SOCIAL_CONFIGS_MODEL_VALUES = {} satisfies ModelValues;

export const USER_SOCIAL_CONFIGS_SCHEMA = z.object({
	// Configs

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type UserSocialConfigsModel = z.infer<typeof USER_SOCIAL_CONFIGS_SCHEMA>;

export const USER_SOCIAL_CONFIGS_CREATE_SCHEMA =
	USER_SOCIAL_CONFIGS_SCHEMA.omit({
		// Omit timestamps on create
		createdAt: true,
		updatedAt: true,
	});

export type UserSocialConfigsCreateModel = z.infer<
	typeof USER_SOCIAL_CONFIGS_CREATE_SCHEMA
>;
