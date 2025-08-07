import z from "zod";

export const PAGINATION_LIMITS = {
  MAX: 500,
  MIN: 20,
  DEFAULT: 20,
};

export const PAGINATED_QUERY_SCHEMA = z.object({
  page: z.preprocess((val) => Number(val), z.number().default(1)),
  limit: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(PAGINATION_LIMITS.MIN)
      .max(PAGINATION_LIMITS.MAX)
      .default(PAGINATION_LIMITS.DEFAULT)
  ),
});

export type PaginatedQuery = z.infer<typeof PAGINATED_QUERY_SCHEMA>;
