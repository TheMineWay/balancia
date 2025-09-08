import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import type { TagSelect } from "@database/schemas/main/tables/finances/tag.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedSearchModel,
	TagCreateModel,
	TagModel,
	UserModel,
	UserModelId,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import { TagsRepository } from "src/features/finances/tags/repositories/tags.repository";
import { TagCreatedEvent, TagDeletedEvent, TagUpdatedEvent } from "src/features/finances/tags/tags.events";

@Injectable()
export class TagsService {

	constructor (private readonly eventService: EventService, private readonly tagsRepository: TagsRepository, @Inject(DATABASE_PROVIDERS.main) private readonly databaseService: DatabaseService) {}

	async getPaginatedTagsByUserId(
		userId: UserModel["id"],
		{ pagination, search }: PaginatedSearchModel,
	) {
		return await this.tagsRepository.paginatedFindByUserId(
			userId,
			pagination,
			search,
		);
	}

	async getById(
		tagId: TagModel["id"],
		options?: QueryOptions,
	): Promise<TagSelect | null> {
		return await this.tagsRepository.findById(tagId, options);
	}

	async create(
		userId: UserModel["id"],
		tag: TagCreateModel,
	): Promise<TagModel> {
		const created = await this.tagsRepository.create({ ...tag, userId });

		this.eventService.emit(new TagCreatedEvent({ tag: created }));

		return created;
	}

	async updateById(
		tagId: TagModel["id"],
		data: Partial<OwnedModel<TagCreateModel>>,
		options?: QueryOptions
	) {
		const updated = await this.tagsRepository.updateById(tagId, data, options);

		if (updated) this.eventService.emit(new TagUpdatedEvent({ tag: updated }));

		return updated;
	}

	async deleteById(tagId: TagModel["id"], options?: QueryOptions) {
		await this.tagsRepository.deleteById(tagId, options);
		this.eventService.emit(new TagDeletedEvent({ tagId }));
	}

	// User related

	async getUserTagById(userId: UserModelId, tagId: TagModel["id"]) {
		const tag = await this.getById(tagId);
		if (!tag || tag.userId !== userId) throw new NotFoundException();

		return tag;
	}

	async updateUserTag(
		userId: UserModel["id"],
		tagId: TagModel["id"],
		data: Partial<TagCreateModel>,
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const tag = await this.getById(tagId, { transaction});
		if (!tag || tag.userId !== userId) throw new UnauthorizedException();

		return await this.updateById(tagId, data, { transaction });
		})
	}

	async deleteUserTag(userId: UserModel["id"], tagId: TagModel["id"]) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const tag = await this.getById(tagId, { transaction });
			if (!tag || tag.userId !== userId) throw new UnauthorizedException();

			await this.deleteById(tagId, { transaction });
		});
	}
}
