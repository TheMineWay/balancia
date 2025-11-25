import z from "zod";

/**
 * Contact Code Generation Strategy
 * Defines the strategies available for generating contact codes.
 */
export enum ContactCodeGenerationStrategy {
	// Universally Unique Identifier
	UUID = "UUID",

	// Hash based on user name and last name
	NAME_HASH = "NAME-HASH",
}

export const CONTACT_CODE_GENERATION_STRATEGY_SCHEMA = z.nativeEnum(
	ContactCodeGenerationStrategy,
);
