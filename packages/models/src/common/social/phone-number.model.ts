import z from "zod";

export const PHONE_NUMBER_SCHEMA = z
	.string()
	.regex(/^\+?[0-9\s\-()]{7,16}$/, "Invalid phone number");

export type PhoneNumberModel = z.infer<typeof PHONE_NUMBER_SCHEMA>;
