import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type {
	OwnedModel,
	PaginatedQuery,
	SearchModel,
	TagAutoMatcherCreateModel,
	TagModel,
	TransactionCreateModel,
	TransactionModel,
	UserModelId,
} from "@shared/models";
import { autoAssignMatch } from "@shared/utils";
import { TagAutoMatcherRepository } from "src/features/finances/tags/repositories/tag-auto-matcher.repository";
import { TagsService } from "src/features/finances/tags/tags.service";
import {
	TransactionCreatedEvent,
	TransactionUpdatedEvent,
} from "src/features/finances/transactions/transactions.events";

const MAX_MATCHERS_PER_RUN = 2000;

@Injectable()
export class TagAutoMatcherService {
	constructor(
		private readonly tagsService: TagsService,
		private readonly tagAutoMatcherRepository: TagAutoMatcherRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async getUserMatchersByTagId(
		userId: UserModelId,
		tagId: TagModel["id"],
		options?: QueryOptions,
	) {
		return await this.tagAutoMatcherRepository.findAllByUserIdAndTagId(
			userId,
			tagId,
			options,
		);
	}

	async getUserMatchersListByTagId(
		userId: UserModelId,
		tagId: TagModel["id"],
		pagination: PaginatedQuery,
		search: SearchModel,
	) {
		const { isOwner } = await this.tagsService.checkTagOwnership(userId, tagId);
		if (!isOwner) throw new UnauthorizedException();

		return await this.tagAutoMatcherRepository.paginatedFindAllByTagId(
			tagId,
			pagination,
			search,
		);
	}

	// #region CRUD

	async createUserTagAutoMatcher(
		userId: UserModelId,
		data: TagAutoMatcherCreateModel,
	) {
		const { isOwner } = await this.tagsService.checkTagOwnership(
			userId,
			data.tagId,
		);
		if (!isOwner) throw new UnauthorizedException();

		return await this.tagAutoMatcherRepository.create(data);
	}

	async deleteUserTagAutoMatcher(
		userId: UserModelId,
		autoMatcherId: TagModel["id"],
	) {
		return await this.databaseService.db.transaction(async (tx) => {
			const automatcher = await this.tagAutoMatcherRepository.findById(
				autoMatcherId,
				{ transaction: tx },
			);
			const { isOwner } = await this.tagsService.checkTagOwnership(
				userId,
				automatcher.tagId,
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.tagAutoMatcherRepository.deleteById(autoMatcherId, {
				transaction: tx,
			});
		});
	}

	async updateUserTagAutoMatcher(
		userId: UserModelId,
		autoMatcherId: TagModel["id"],
		data: Partial<TagAutoMatcherCreateModel>,
	) {
		return await this.databaseService.db.transaction(async (tx) => {
			const autoMatcher = await this.tagAutoMatcherRepository.findById(
				autoMatcherId,
				{ transaction: tx },
			);
			const { isOwner } = await this.tagsService.checkTagOwnership(
				userId,
				autoMatcher.tagId,
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.tagAutoMatcherRepository.updateById(
				autoMatcherId,
				data,
				{ transaction: tx },
			);
		});
	}

	// #endregion CRUD

	// #region Matchers

	/**
	 * Given a transaction, it checks all the user's automatchers to see if any match the transaction.
	 * It returns all tagIds that matched.
	 */
	private async getTransactionMatchingTags(
		transaction: OwnedModel<TransactionCreateModel>,
		options?: QueryOptions,
	) {
		const { items: matchers } =
			await this.tagAutoMatcherRepository.paginatedFindAllByUserId(
				transaction.userId,
				{ page: 1, limit: MAX_MATCHERS_PER_RUN },
				{ search: null },
				options,
			);

		const matchedTags: TagModel["id"][] = [];
		for (const matcher of matchers) {
			if (matchedTags.includes(matcher.tagId)) continue;

			const matches = autoAssignMatch(transaction, matcher.criteria);
			if (matches) matchedTags.push(matcher.tagId);
		}

		return matchedTags;
	}

	/**
	 * Detect necessary tags for a transaction and assign them.
	 */
	private async matchTransactionTags(
		transaction: OwnedModel<TransactionModel>,
	) {
		await this.databaseService.db.transaction(async (tx) => {
			const tagIds = await this.getTransactionMatchingTags(transaction, {
				transaction: tx,
			});
			if (tagIds.length === 0) return;

			// Assign tags to transaction. We cannot use the transaction service here as it would trigger an infinite loop.
			await this.tagAutoMatcherRepository.matchTransactionTags(
				transaction.id,
				tagIds,
				{ transaction: tx },
			);
		});
	}

	// #endregion

	// Events

	@OnEvent(TransactionCreatedEvent.NAME)
	protected async onTransactionCreated(event: TransactionCreatedEvent) {
		await this.matchTransactionTags(event.payload.transaction);
	}

	@OnEvent(TransactionUpdatedEvent.NAME)
	protected async onTransactionUpdated(event: TransactionUpdatedEvent) {
		await this.matchTransactionTags(event.payload.transaction);
	}
}
