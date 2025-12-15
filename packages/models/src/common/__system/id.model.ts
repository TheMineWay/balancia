import z from "zod";

export const ID_SCHEMA = z.number().int().positive();
export type IdModel = z.infer<typeof ID_SCHEMA>;
