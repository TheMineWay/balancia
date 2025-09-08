import { QueryOptions, Repository } from "@database/repository/repository";
import {
	TagInsert,
	TagSelect,
	TagUpdate,
	tagTable,
} from "@database/schemas/main/tables/finances/tag.table";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
	PaginatedQuery,
	PaginatedResponse,
	SearchModel,
	TagModel,
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
}
