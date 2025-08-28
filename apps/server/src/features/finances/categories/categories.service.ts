import { Injectable } from "@nestjs/common";
import {
	CategoryCreateModel,
	CategoryModel,
	PaginatedSearchModel,
	UserModel,
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
	) {}

	async getPaginatedCategoriesByUserId(
		userId: UserModel["id"],
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

	async create(userId: UserModel["id"], category: CategoryCreateModel) {
		const created = await this.categoriesRepository.create({
			...category,
			userId,
		});

		this.eventService.emit(new CategoryCreatedEvent({ category: created }));

		return created;
	}

	async deleteByUserIdAndId(
		userId: UserModel["id"],
		categoryId: CategoryModel["id"],
	) {
		await this.categoriesRepository.deleteByUserIdAndId(userId, categoryId);
		this.eventService.emit(new CategoryDeletedEvent({ categoryId }));
	}

	async updateByUserIdAndId(
		userId: UserModel["id"],
		categoryId: CategoryModel["id"],
		data: Partial<CategoryCreateModel>,
	) {
		const updated = await this.categoriesRepository.updateByUserIdAndId(
			userId,
			categoryId,
			data,
		);

		if (updated) {
			this.eventService.emit(new CategoryUpdatedEvent({ category: updated }));
		}

		return updated;
	}
}
