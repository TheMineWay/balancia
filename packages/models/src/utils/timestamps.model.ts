import { object, z } from "zod";
import { DATE_SCHEMA } from "./date.model";

export const TIMESTAMPS_SCHEMA = object({
	createdAt: DATE_SCHEMA,
	updatedAt: DATE_SCHEMA,
});
export type TimestampsSchema = z.infer<typeof TIMESTAMPS_SCHEMA>;
