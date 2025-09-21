import { ID_SCHEMA } from "@/common/__system/id.model";
import { PHONE_NUMBER_SCHEMA } from "@/common/social/phone-number.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const CONTACT_MODEL_VALUES = {
	code: {
		maxLength: 36,
	},
	name: {
		maxLength: 64,
	},
	lastName: {
		maxLength: 128,
	},
	email: {
		maxLength: 256,
	},
	phone: {
		maxLength: 16,
	},
} satisfies ModelValues;

export const CONTACT_SCHEMA = z.object({
	id: ID_SCHEMA,
	code: z.string().max(CONTACT_MODEL_VALUES.code.maxLength),
	name: z.string().max(CONTACT_MODEL_VALUES.name.maxLength),
	lastName: z
		.string()
		.max(CONTACT_MODEL_VALUES.lastName.maxLength)
		.nullable()
		.default(null),
	email: z.string().max(CONTACT_MODEL_VALUES.email.maxLength).optional(),
	phone: PHONE_NUMBER_SCHEMA.max(
		CONTACT_MODEL_VALUES.phone.maxLength,
	).optional(),
});

export type ContactModel = z.infer<typeof CONTACT_SCHEMA>;

/* Create */
export const CONTACT_CREATE_SCHEMA = CONTACT_SCHEMA.omit({ id: true });
export type ContactCreateModel = z.infer<typeof CONTACT_CREATE_SCHEMA>;
