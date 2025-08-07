import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { DatabaseService } from "@database/services/database.service";
import { Inject } from "@nestjs/common";
import { PaginatedQuery } from "@shared/models";
import { ColumnsSelection, count } from "drizzle-orm";
import { MySqlSelectBase, PreparedQueryHKTBase } from "drizzle-orm/mysql-core";
import {
	JoinNullability,
	SelectMode,
} from "drizzle-orm/query-builders/select.types";

export type Transaction = Parameters<
	Parameters<DatabaseService["db"]["transaction"]>[0]
>[0];

export type QueryOptions = {
	transaction?: Transaction;
};

export abstract class Repository {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		protected readonly dbService: DatabaseService,
	) {}

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
		TPreparedQueryHKT extends PreparedQueryHKTBase,
		TNullabilityMap extends Record<
			string,
			JoinNullability
			// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		> = TTableName extends string ? Record<TTableName, "not-null"> : {},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		TDynamic extends boolean = false,
		TExcludedMethods extends string = never,
	>(
		pagination: PaginatedQuery,
		query: MySqlSelectBase<
			TTableName,
			TSelection,
			TSelectMode,
			TPreparedQueryHKT,
			TNullabilityMap,
			true,
			TExcludedMethods
		>,
	) {
		const rows = await query
			.limit(pagination.limit)
			.offset((pagination.page - 1) * pagination.limit);

		// @ts-ignore hack to override internals (not the ideal way)
		query.config.fields = { count: count() };
		// @ts-ignore hack to override internals (not the ideal way)
		delete query.config.limit;
		// @ts-ignore hack to override internals (not the ideal way)
		delete query.config.offset;

		// @ts-ignore
		query.config.orderBy = [];

		const [total] = await query;
		return {
			rows,
			count: total.count as number,
		};
	}
}
