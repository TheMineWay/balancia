import z from "zod";

export const NULLABLE_ID_SCHEMA = z.preprocess((val) => {
	if (typeof val === "string") {
		const value = parseInt(val, 10);
		if (Number.isNaN(value) || value === -1) {
			return null;
		}
		return value;
	}
	return val;
}, z.number().int().positive().nullable());

export type NullableIdModel = z.infer<typeof NULLABLE_ID_SCHEMA>;
