import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { DatabaseService } from "@database/services/database.service";
import { Inject } from "@nestjs/common";
import type { PaginatedQuery } from "@shared/models";
import { type ColumnsSelection, count } from "drizzle-orm";
import { PgSelectBase } from "drizzle-orm/pg-core";

import type {
	BuildSubquerySelection,
	JoinNullability,
	SelectMode,
	SelectResult,
} from "drizzle-orm/query-builders/select.types";

export type Transaction = Parameters<
	Parameters<DatabaseService["db"]["transaction"]>[0]
>[0];

export type QueryOptions = {
	transaction?: Transaction;
};

/**
 * Abstract base repository class that provides common database operations.
 * Includes transaction support and pagination utilities for Drizzle ORM.
 */
export abstract class Repository {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		protected readonly dbService: DatabaseService,
	) {}

	/**
	 * Returns the appropriate database instance for querying.
	 * Uses the provided transaction if available, otherwise the main database connection.
	 */
	protected query = (options?: QueryOptions) =>
		options?.transaction || this.dbService.db;

	public transaction: typeof this.dbService.db.transaction = (options) =>
		this.dbService.db.transaction(options);

	/**
	 * Paginates a query with the given pagination parameters.
	 */
	protected async paginated<
		TTableName extends string | undefined,
		TSelection extends ColumnsSelection,
		TSelectMode extends SelectMode,
		TNullabilityMap extends Record<
			string,
			JoinNullability
		> = TTableName extends string ? Record<TTableName, "not-null"> : {},
		TDynamic extends true = true,
		TExcludedMethods extends string = never,
		// biome-ignore lint/suspicious/noExplicitAny: all results are accepted
		TResult extends any[] = SelectResult<
			TSelection,
			TSelectMode,
			TNullabilityMap
		>[],
		TSelectedFields extends ColumnsSelection = BuildSubquerySelection<
			TSelection,
			TNullabilityMap
		>,
	>(
		pagination: PaginatedQuery,
		query: PgSelectBase<
			TTableName,
			TSelection,
			TSelectMode,
			TNullabilityMap,
			TDynamic,
			TExcludedMethods,
			TResult,
			TSelectedFields
		>,
	) {
		const rows = await query
			.limit(pagination.limit)
			.offset((pagination.page - 1) * pagination.limit);

		// @ts-expect-error hack to override internals (not the ideal way)
		query.config.fields = { count: count() };
		// @ts-expect-error hack to override internals (not the ideal way)
		delete query.config.limit;
		// @ts-expect-error hack to override internals (not the ideal way)
		delete query.config.offset;

		// @ts-expect-error
		query.config.orderBy = [];

		const [total] = await query;
		return {
			rows,
			count: total.count as number,
		};
	}
}
