import { QueryOptions, Repository } from "@database/repository/repository";
import { tagTable } from "@database/schemas/main.schema";
import {
	TAG_AUTOMATCHER_TABLE_COLUMNS,
	TagAutomatcherInsert,
	TagAutomatcherUpdate,
	tagAutomatcherTable,
} from "@database/schemas/main/tables/finances/tag-automatcher.table";
import { transactionTagTable } from "@database/schemas/main/tables/finances/transaction-tag.table";
import { Injectable } from "@nestjs/common";
import {
	PaginatedQuery,
	SearchModel,
	TagAutomatcherModel,
	TagModel,
	TransactionModel,
	UserModelId,
} from "@shared/models";
import { and, desc, eq, ilike, or } from "drizzle-orm";

@Injectable()
export class TagAutomatcherRepository extends Repository {
	async findById(id: TagAutomatcherModel["id"], options?: QueryOptions) {
		const [item] = await this.query(options)
			.select()
			.from(tagAutomatcherTable)
			.where(eq(tagAutomatcherTable.id, id));
		return item;
	}

	async findAllByUserIdAndTagId(
		userId: UserModelId,
		tagId: TagModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.select(TAG_AUTOMATCHER_TABLE_COLUMNS)
			.from(tagAutomatcherTable)
			.innerJoin(tagTable, eq(tagTable.id, tagAutomatcherTable.tagId))
			.where(
				and(eq(tagTable.userId, userId), eq(tagAutomatcherTable.tagId, tagId)),
			);
	}

	async paginatedFindAllByTagId(
		tagId: TagModel["id"],
		pagination: PaginatedQuery,
		search: SearchModel,
		options?: QueryOptions,
	) {
		const searchCondition = this.getSearchCondition(search);
		const query = this.query(options)
			.select(TAG_AUTOMATCHER_TABLE_COLUMNS)
			.from(tagAutomatcherTable)
			.where(and(searchCondition, eq(tagAutomatcherTable.tagId, tagId)))
			.orderBy(desc(tagAutomatcherTable.tagId))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return { items, total };
	}

	async paginatedFindAllByUserId(
		userId: UserModelId,
		pagination: PaginatedQuery,
		search: SearchModel,
		options?: QueryOptions,
	) {
		const searchCondition = this.getSearchCondition(search);
		const query = this.query(options)
			.select(TAG_AUTOMATCHER_TABLE_COLUMNS)
			.from(tagAutomatcherTable)
			.innerJoin(tagTable, eq(tagTable.id, tagAutomatcherTable.tagId))
			.orderBy(desc(tagAutomatcherTable.tagId))
			.where(and(searchCondition, eq(tagTable.userId, userId)))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return { items, total };
	}

	async matchTransactionTags(
		transactionId: TransactionModel["id"],
		tagIds: TagModel["id"][],
		options?: QueryOptions,
	) {
		const payload = tagIds.map((tagId) => ({ transactionId, tagId }));
		return await this.query(options)
			.insert(transactionTagTable)
			.values(payload);
	}

	async create(data: TagAutomatcherInsert, options?: QueryOptions) {
		return await this.query(options)
			.insert(tagAutomatcherTable)
			.values(data)
			.returning();
	}

	async deleteById(id: TagAutomatcherModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(tagAutomatcherTable)
			.where(eq(tagAutomatcherTable.id, id))
			.returning();
	}

	async updateById(
		id: TagAutomatcherModel["id"],
		data: TagAutomatcherUpdate,
		options?: QueryOptions,
	) {
		return await this.query(options)
			.update(tagAutomatcherTable)
			.set(data)
			.where(eq(tagAutomatcherTable.id, id))
			.returning();
	}

	/* Internal */
	private getSearchCondition(search: SearchModel) {
		const searchCondition = search.search
			? or(
					ilike(tagAutomatcherTable.name, `%${search.search}%`),
					ilike(tagAutomatcherTable.description, `%${search.search}%`),
				)
			: undefined;

		return searchCondition;
	}
}
