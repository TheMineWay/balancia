import { USER_SCHEMA } from "@/core/user/user.model";
import { ACCOUNT_SCHEMA } from "@/money/transactions/account.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const USER_PREFERENCES_SCHEMA = z.object({
	userId: USER_SCHEMA.shape.id,

	// [ CONFIGS ]

	// Account
	mainAccount: ACCOUNT_SCHEMA.shape.id.nullable().default(null),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type UserPreferencesModel = z.infer<typeof USER_PREFERENCES_SCHEMA>;

// Create

export const USER_PREFERENCES_CREATE_SCHEMA = USER_PREFERENCES_SCHEMA.omit({
	createdAt: true,
	updatedAt: true,
});

export type UserPreferencesCreateModel = z.infer<
	typeof USER_PREFERENCES_CREATE_SCHEMA
>;
