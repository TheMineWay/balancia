import z from "zod";

export const PHONE_NUMBER_REGEXP = /^\+?[0-9\s\-()]{7,16}$/;

export const PHONE_NUMBER_SCHEMA = z
	.string()
	.regex(PHONE_NUMBER_REGEXP, "Invalid phone number");

export type PhoneNumberModel = z.infer<typeof PHONE_NUMBER_SCHEMA>;
