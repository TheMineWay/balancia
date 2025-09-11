import { QueryOptions, Repository } from "@database/repository/repository";
import {
	TAG_TABLE_COLUMNS,
	TagInsert,
	TagSelect,
	TagUpdate,
	tagTable,
} from "@database/schemas/main/tables/finances/tag.table";
import { transactionTagTable } from "@database/schemas/main/tables/finances/transaction-tag.table";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
	PaginatedQuery,
	PaginatedResponse,
	SearchModel,
	TagModel,
	TransactionModel,
	UserModelId,
} from "@shared/models";
import { and, desc, eq, ilike } from "drizzle-orm";

@Injectable()
export class TagsRepository extends Repository {
	async paginatedFindByUserId(
		userId: UserModelId,
		pagination: PaginatedQuery,
		search?: SearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<TagSelect>> {
		const searchCondition = search?.search
			? ilike(tagTable.name, `%${search.search}%`)
			: undefined;

		const query = this.query(options)
			.select()
			.from(tagTable)
			.where(and(eq(tagTable.userId, userId), searchCondition))
			.orderBy(desc(tagTable.id))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return { items, total };
	}

	// #region CRUD

	async findById(
		id: TagModel["id"],
		options?: QueryOptions,
	): Promise<TagSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(tagTable)
					.where(eq(tagTable.id, id))
			)?.[0] ?? null
		);
	}

	async create(tag: TagInsert, options?: QueryOptions): Promise<TagModel> {
		const [created] = await this.query(options)
			.insert(tagTable)
			.values(tag)
			.returning();

		if (!created) throw new InternalServerErrorException();

		return created;
	}

	async updateById(
		id: TagModel["id"],
		data: TagUpdate,
		options?: QueryOptions,
	): Promise<TagSelect | null> {
		return (
			(
				await this.query(options)
					.update(tagTable)
					.set(data)
					.where(eq(tagTable.id, id))
					.returning()
			)?.[0] ?? null
		);
	}

	async deleteById(id: TagModel["id"], options?: QueryOptions): Promise<void> {
		await this.query(options).delete(tagTable).where(eq(tagTable.id, id));
	}

	// #endregion

	// #region Transaction related

	async findTagsByTransactionId(
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	): Promise<TagSelect[]> {
		return await this.query(options)
			.select(TAG_TABLE_COLUMNS)
			.from(tagTable)
			.innerJoin(
				transactionTagTable,
				eq(transactionTagTable.transactionId, tagTable.id),
			)
			.where(eq(transactionTagTable.transactionId, transactionId));
	}

	async addTagToTransaction(
		tagId: TagModel["id"],
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		await this.query(options)
			.insert(transactionTagTable)
			.values({ tagId, transactionId });
	}

	async removeTagFromTransaction(
		tagId: TagModel["id"],
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		await this.query(options)
			.delete(transactionTagTable)
			.where(
				and(
					eq(transactionTagTable.tagId, tagId),
					eq(transactionTagTable.transactionId, transactionId),
				),
			);
	}

	// #endregion
}
