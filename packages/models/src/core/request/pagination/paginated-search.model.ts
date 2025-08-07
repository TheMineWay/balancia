import { PAGINATED_QUERY_SCHEMA } from "@/core/request/pagination/paginated-query.model";
import { SEARCH_SCHEMA } from "@/core/request/search.model";
import z from "zod";

export const PAGINATED_SEARCH_SCHEMA = z.object({
	pagination: PAGINATED_QUERY_SCHEMA,
	search: SEARCH_SCHEMA.optional().default({ search: null }),
});

export type PaginatedSearchModel = z.infer<typeof PAGINATED_SEARCH_SCHEMA>;
