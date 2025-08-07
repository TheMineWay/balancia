import z from "zod";

/* BASE */

export const SEARCH_SCHEMA = z.object({
  search: z.string().optional().nullable().default(null),
});

export type SearchModel = z.infer<typeof SEARCH_SCHEMA>;
