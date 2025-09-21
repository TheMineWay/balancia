import { QueryOptions, Repository } from "@database/repository/repository";
import { tagAutomatcherTable } from "@database/schemas/main/tables/finances/tag-automatcher.table";
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
			.select()
			.from(tagAutomatcherTable)
			.where(
				and(
					eq(tagAutomatcherTable.userId, userId),
					eq(tagAutomatcherTable.tagId, tagId),
				),
			);
	}

	async paginatedFindAllByUserId(
		userId: UserModelId,
		pagination: PaginatedQuery,
		options?: QueryOptions,
	) {
		const query = this.query(options)
			.select()
			.from(tagAutomatcherTable)
			.where(eq(tagAutomatcherTable.userId, userId))
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
}
