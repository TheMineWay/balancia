import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { CategorySelect } from "@database/schemas/main/tables/finances/category.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
	CategoryCreateModel,
	CategoryModel,
	OwnedModel,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	CategoryCreatedEvent,
	CategoryDeletedEvent,
	CategoryUpdatedEvent,
} from "src/features/finances/categories/categories.events";
import { CategoriesRepository } from "src/features/finances/categories/repositories/categories.repository";

@Injectable()
export class CategoriesService {
	constructor(
		private readonly categoriesRepository: CategoriesRepository,
		private readonly eventService: EventService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async checkCategoryOwnership(
		userId: UserModelId,
		categoryId: CategoryModel["id"],
		options?: QueryOptions,
	): Promise<CheckCategoryOwnershipResponse> {
		const category = await this.categoriesRepository.findCategoryByUserId(
			userId,
			categoryId,
			options,
		);

		if (category) {
			return { isOwner: true, category };
		} else {
			return { isOwner: false, category: null };
		}
	}

	async create(category: OwnedModel<CategoryCreateModel>) {
		const created = await this.categoriesRepository.create(category);

		this.eventService.emit(new CategoryCreatedEvent({ category: created }));

		return created;
	}

	async updateById(
		categoryId: CategoryModel["id"],
		data: Partial<CategoryCreateModel>,
		options?: QueryOptions,
	) {
		const updated = await this.categoriesRepository.updateById(
			categoryId,
			data,
			options,
		);

		if (updated) {
			this.eventService.emit(new CategoryUpdatedEvent({ category: updated }));
		}

		return updated;
	}

	async deleteById(categoryId: CategoryModel["id"], options?: QueryOptions) {
		await this.categoriesRepository.deleteById(categoryId, options);

		this.eventService.emit(new CategoryDeletedEvent({ categoryId }));
	}

	// #region User Methods

	async getPaginatedCategoriesByUserId(
		userId: UserModelId,
		{ pagination, search }: PaginatedSearchModel,
	) {
		return await this.categoriesRepository.paginatedFindByUserId(
			userId,
			pagination,
			search,
		);
	}

	async getUserCategoryById(
		userId: UserModelId,
		categoryId: CategoryModel["id"],
	) {
		return await this.categoriesRepository.findCategoryByUserId(
			userId,
			categoryId,
		);
	}

	async userCreate(userId: UserModelId, category: CategoryCreateModel) {
		return await this.create({
			...category,
			userId,
		});
	}

	async userDeleteById(userId: UserModelId, categoryId: CategoryModel["id"]) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkCategoryOwnership(userId, categoryId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.deleteById(categoryId, { transaction });
		});
	}

	async userUpdateById(
		userId: UserModelId,
		categoryId: CategoryModel["id"],
		data: Partial<CategoryCreateModel>,
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkCategoryOwnership(userId, categoryId);
			if (!isOwner) throw new UnauthorizedException();

			return await this.updateById(categoryId, data, { transaction });
		});
	}

	// #endregion
}

/* Internal */

type CheckCategoryOwnershipResponse =
	| { isOwner: true; category: CategorySelect }
	| { isOwner: false; category: null };
