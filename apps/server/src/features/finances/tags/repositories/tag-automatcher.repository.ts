import { QueryOptions, Repository } from "@database/repository/repository";
import { tagTable } from "@database/schemas/main.schema";
import {
	TAG_AUTOMATCHER_TABLE_COLUMNS,
	TagAutomatcherInsert,
	tagAutomatcherTable,
} from "@database/schemas/main/tables/finances/tag-automatcher.table";
import { transactionTagTable } from "@database/schemas/main/tables/finances/transaction-tag.table";
import { Injectable } from "@nestjs/common";
import {
	PaginatedQuery,
	TagModel,
	TransactionModel,
	UserModelId,
} from "@shared/models";
import { and, desc, eq } from "drizzle-orm";

@Injectable()
export class TagAutomatcherRepository extends Repository {
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

	async paginatedFindAllByUserId(
		userId: UserModelId,
		pagination: PaginatedQuery,
		options?: QueryOptions,
	) {
		const query = this.query(options)
			.select(TAG_AUTOMATCHER_TABLE_COLUMNS)
			.from(tagAutomatcherTable)
			.innerJoin(tagTable, eq(tagTable.id, tagAutomatcherTable.tagId))
			.where(eq(tagTable.userId, userId))
			.orderBy(desc(tagAutomatcherTable.tagId))
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
}
