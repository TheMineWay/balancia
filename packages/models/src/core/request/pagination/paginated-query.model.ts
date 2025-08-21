import z from "zod";

/**
 * Configuration constants for pagination limits to ensure consistent behavior across the application.
 */
export const PAGINATION_LIMITS = {
	MAX: 500,
	MIN: 20,
	DEFAULT: 20,
};

/**
 * Zod schema for validating paginated query parameters.
 * Ensures page and limit values are within acceptable ranges.
 */
export const PAGINATED_QUERY_SCHEMA = z.object({
	page: z.preprocess((val) => Number(val), z.number().default(1)),
	limit: z.preprocess(
		(val) => Number(val),
		z
			.number()
			.min(PAGINATION_LIMITS.MIN)
			.max(PAGINATION_LIMITS.MAX)
			.default(PAGINATION_LIMITS.DEFAULT),
	),
});

export type PaginatedQuery = z.infer<typeof PAGINATED_QUERY_SCHEMA>;
