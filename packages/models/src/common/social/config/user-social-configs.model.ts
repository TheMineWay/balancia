/**
 * User Social Configs Model
 *
 * This model represents the user configurations related to social features. This is stored in the database.
 * A user can have 0 or 1 social configs. If the user has no social configs, the default values are used.
 */

import {
	CONTACT_CODE_GENERATION_STRATEGY_SCHEMA,
	ContactCodeGenerationStrategy,
} from "@/common/social/code/contact-code-generation-strategy.models";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const USER_SOCIAL_CONFIGS_MODEL_VALUES = {
	contactCodeGenerationStrategy: {
		default: ContactCodeGenerationStrategy.NAME_HASH,
	},
} satisfies ModelValues;

export const USER_SOCIAL_CONFIGS_SCHEMA = z.object({
	// Configs
	contactCodeGenerationStrategy:
		CONTACT_CODE_GENERATION_STRATEGY_SCHEMA.default(
			USER_SOCIAL_CONFIGS_MODEL_VALUES.contactCodeGenerationStrategy.default,
		),

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
