import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type {
	OwnedModel,
	PaginatedQuery,
	SearchModel,
	TagAutomatcherCreateModel,
	TagModel,
	TransactionCreateModel,
	TransactionModel,
	UserModelId,
} from "@shared/models";
import { autoAssignMatch } from "@shared/utils";
import { TagAutomatcherRepository } from "src/features/finances/tags/repositories/tag-automatcher.repository";
import { TagsService } from "src/features/finances/tags/tags.service";
import {
	TransactionCreatedEvent,
	TransactionUpdatedEvent,
} from "src/features/finances/transactions/transactions.events";

const MAX_MATCHERS_PER_RUN = 2000;

@Injectable()
export class TagAutomatcherService {
	constructor(
		private readonly tagsService: TagsService,
		private readonly tagAutomatcherRepository: TagAutomatcherRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async getUserMatchersByTagId(
		userId: UserModelId,
		tagId: TagModel["id"],
		options?: QueryOptions,
	) {
		return await this.tagAutomatcherRepository.findAllByUserIdAndTagId(
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

		return await this.tagAutomatcherRepository.paginatedFindAllByTagId(
			tagId,
			pagination,
			search,
		);
	}

	async getUserMatchers() {}

	async createUserTagAutomatcher(
		userId: UserModelId,
		data: TagAutomatcherCreateModel,
	) {
		const { isOwner } = await this.tagsService.checkTagOwnership(
			userId,
			data.tagId,
		);
		if (!isOwner) throw new UnauthorizedException();

		return await this.tagAutomatcherRepository.create(data);
	}

	// Matchers

	/**
	 * Given a transaction, it checks all the user's automatchers to see if any match the transaction.
	 * It returns all tagIds that matched.
	 */
	private async getTransactionMatchingTags(
		transaction: OwnedModel<TransactionCreateModel>,
		options?: QueryOptions,
	) {
		const { items: matchers } =
			await this.tagAutomatcherRepository.paginatedFindAllByUserId(
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
			await this.tagAutomatcherRepository.matchTransactionTags(
				transaction.id,
				tagIds,
				{ transaction: tx },
			);
		});
	}

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
