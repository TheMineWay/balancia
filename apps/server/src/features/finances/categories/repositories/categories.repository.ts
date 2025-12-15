import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	type CategoryInsert,
	CategorySelect,
	type CategoryUpdate,
	categoryTable,
} from "@database/schemas/main/tables/finances/category.table";
import { Injectable } from "@nestjs/common";
import type {
	CategoryModel,
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	SearchModel,
	UserModel,
} from "@shared/models";
import { and, desc, eq, ilike } from "drizzle-orm";

@Injectable()
export class CategoriesRepository extends Repository {
	async paginatedFindByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
		search?: SearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<OwnedModel<CategorySelect>>> {
		const query = this.query(options)
			.select()
			.from(categoryTable)
			.where(
				and(
					eq(categoryTable.userId, userId),
					search?.search
						? ilike(categoryTable.name, `%${search.search}%`)
						: undefined,
				),
			)
			.orderBy(desc(categoryTable.id))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return {
			items,
			total,
		};
	}

	async findCategoryByUserId(
		userId: UserModel["id"],
		categoryId: CategoryModel["id"],
		options?: QueryOptions,
	): Promise<CategorySelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(categoryTable)
					.where(
						and(
							eq(categoryTable.id, categoryId),
							eq(categoryTable.userId, userId),
						),
					)
					.limit(1)
			)?.[0] ?? null
		);
	}

	async updateById(
		categoryId: CategoryModel["id"],
		data: CategoryUpdate,
		options?: QueryOptions,
	): Promise<CategorySelect | null> {
		return (
			(
				await this.query(options)
					.update(categoryTable)
					.set(data)
					.where(eq(categoryTable.id, categoryId))
					.returning()
			)?.[0] ?? null
		);
	}

	async deleteById(categoryId: CategoryModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(categoryTable)
			.where(eq(categoryTable.id, categoryId));
	}

	async create(data: CategoryInsert, options?: QueryOptions) {
		return (
			await this.query(options).insert(categoryTable).values(data).returning()
		)[0];
	}
}
