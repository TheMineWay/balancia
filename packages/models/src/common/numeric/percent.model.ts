import z from "zod";

/**
 * A numeric value representing a percentage (0 to 100).
 */
export const PERCENT_SCHEMA = z.number().min(0).max(100);

export type PercentModel = z.infer<typeof PERCENT_SCHEMA>;
