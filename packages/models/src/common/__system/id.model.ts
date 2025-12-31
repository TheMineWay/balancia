import z from "zod";

export const ID_SCHEMA = z.preprocess((val) => {
	if (typeof val === "string") return parseInt(val, 10);
	return val;
}, z.number().int().positive()) as unknown as z.ZodNumber;

export type IdModel = z.infer<typeof ID_SCHEMA>;
