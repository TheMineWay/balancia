import z from "zod";

export const PAGINATED_QUERY_SCHEMA = z.object({
  page: z.preprocess((val) => Number(val), z.number().default(1)),
  limit: z.preprocess(
    (val) => Number(val),
    z.number().min(20).max(500).default(20)
  ),
});

export type PaginatedQuery = z.infer<typeof PAGINATED_QUERY_SCHEMA>;
