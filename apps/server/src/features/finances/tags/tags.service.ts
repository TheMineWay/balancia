import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import type { TagSelect } from "@database/schemas/main/tables/finances/tag.table";
import { DatabaseService } from "@database/services/database.service";
import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedSearchModel,
	TagCreateModel,
	TagModel,
	TransactionModel,
	UserModel,
	UserModelId,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import { TagsRepository } from "src/features/finances/tags/repositories/tags.repository";
import {
	TagCreatedEvent,
	TagDeletedEvent,
	TagUpdatedEvent,
} from "src/features/finances/tags/tags.events";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Injectable()
export class TagsService {
	constructor(
		private readonly eventService: EventService,
		private readonly tagsRepository: TagsRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly transactionsService: TransactionsService,
	) {}

	async getPaginatedTagsByUserId(
		userId: UserModelId,
		{ pagination, search }: PaginatedSearchModel,
	) {
		return await this.tagsRepository.paginatedFindByUserId(
			userId,
			pagination,
			search,
		);
	}

	// #region Basic CRUD

	async getById(
		tagId: TagModel["id"],
		options?: QueryOptions,
	): Promise<TagSelect | null> {
		return await this.tagsRepository.findById(tagId, options);
	}

	async create(userId: UserModelId, tag: TagCreateModel): Promise<TagModel> {
		const created = await this.tagsRepository.create({ ...tag, userId });

		this.eventService.emit(new TagCreatedEvent({ tag: created }));

		return created;
	}

	async updateById(
		tagId: TagModel["id"],
		data: Partial<OwnedModel<TagCreateModel>>,
		options?: QueryOptions,
	) {
		const updated = await this.tagsRepository.updateById(tagId, data, options);

		if (updated) this.eventService.emit(new TagUpdatedEvent({ tag: updated }));

		return updated;
	}

	async deleteById(tagId: TagModel["id"], options?: QueryOptions) {
		await this.tagsRepository.deleteById(tagId, options);
		this.eventService.emit(new TagDeletedEvent({ tagId }));
	}

	// #endregion

	// User related

	async getUserTagById(
		userId: UserModelId,
		tagId: TagModel["id"],
		options?: QueryOptions,
	) {
		const tag = await this.getById(tagId, options);
		if (!tag || tag.userId !== userId) throw new NotFoundException();

		return tag;
	}

	async updateUserTag(
		userId: UserModelId,
		tagId: TagModel["id"],
		data: Partial<TagCreateModel>,
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const tag = await this.getById(tagId, { transaction });
			if (!tag || tag.userId !== userId) throw new UnauthorizedException();

			return await this.updateById(tagId, data, { transaction });
		});
	}

	async deleteUserTag(userId: UserModel["id"], tagId: TagModel["id"]) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const tag = await this.getById(tagId, { transaction });
			if (!tag || tag.userId !== userId) throw new UnauthorizedException();

			await this.deleteById(tagId, { transaction });
		});
	}

	// #region Transaction related

	async getUserTagsByTransactionId(
		userId: UserModelId,
		transactionId: TransactionModel["id"],
	): Promise<TagModel[]> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } =
				await this.transactionsService.checkTransactionOwnership(
					userId,
					transactionId,
					{ transaction },
				);
			if (!isOwner) throw new UnauthorizedException();

			return await this.tagsRepository.findTagsByTransactionId(transactionId, {
				transaction,
			});
		});
	}

	async addTagToTransaction(
		userId: UserModelId,
		tagId: TagModel["id"],
		transactionId: TransactionModel["id"],
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } =
				await this.transactionsService.checkTransactionOwnership(
					userId,
					transactionId,
					{ transaction },
				);
			if (!isOwner) throw new UnauthorizedException();

			const userTag = await this.getUserTagById(userId, tagId, { transaction });

			return await this.tagsRepository.addTagToTransaction(
				userTag.id,
				transactionId,
				{ transaction },
			);
		});
	}

	async removeTagFromTransaction(
		userId: UserModelId,
		tagId: TagModel["id"],
		transactionId: TransactionModel["id"],
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } =
				await this.transactionsService.checkTransactionOwnership(
					userId,
					transactionId,
					{ transaction },
				);
			if (!isOwner) throw new UnauthorizedException();

			const userTag = await this.getUserTagById(userId, tagId, { transaction });

			return await this.tagsRepository.removeTagFromTransaction(
				userTag.id,
				transactionId,
				{ transaction },
			);
		});
	}

	// #endregion
}
