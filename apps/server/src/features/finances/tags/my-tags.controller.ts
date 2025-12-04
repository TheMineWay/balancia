import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	getParamName,
	InferBodyDto,
	type InferQueryDto,
	type InferResponseDto,
	MY_TAGS_CONTROLLER,
} from "@shared/api-definition";
import { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { TagAutoMatcherService } from "src/features/finances/tags/tag-auto-matcher.service";
import { TagsService } from "src/features/finances/tags/tags.service";

@Controller(getController(MY_TAGS_CONTROLLER, {}))
export class MyTagsController {
	constructor(
		private readonly tagsService: TagsService,
		private readonly tagAutoMatcherService: TagAutoMatcherService,
	) {}

	@Endpoint(MY_TAGS_CONTROLLER, "getTagsList")
	async getTagsList(
		@ValidatedQuery(MY_TAGS_CONTROLLER, "getTagsList") query: InferQueryDto<
			typeof MY_TAGS_CONTROLLER,
			"getTagsList"
		>,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "getTagsList">> {
		return await this.tagsService.getPaginatedTagsByUserId(userId, query);
	}

	// CRUD

	@Endpoint(MY_TAGS_CONTROLLER, "getTag")
	async getTag(
		@Param(getParamName(MY_TAGS_CONTROLLER, "getTag", "id"), ParseIntPipe)
		id: number,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "getTag">> {
		return await this.tagsService.userGetById(userId, id);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "createTag")
	async createTag(
		@ValidatedBody(MY_TAGS_CONTROLLER, "createTag") body,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "createTag">> {
		await this.tagsService.create(userId, body);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "updateTag")
	async updateTag(
		@Param(getParamName(MY_TAGS_CONTROLLER, "updateTag", "id"), ParseIntPipe)
		id: number,
		@ValidatedBody(MY_TAGS_CONTROLLER, "updateTag") body,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "updateTag">> {
		await this.tagsService.userUpdateById(userId, id, body);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "deleteTag")
	async deleteTag(
		@Param(getParamName(MY_TAGS_CONTROLLER, "deleteTag", "id"), ParseIntPipe)
		id: number,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "deleteTag">> {
		await this.tagsService.userDeleteById(userId, id);
	}

	// Transaction related
	@ApiOperation({ summary: "Add a tag to a transaction" })
	@Endpoint(MY_TAGS_CONTROLLER, "addTagToTransaction")
	async addTagToTransaction(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "addTagToTransaction", "tagId"),
			ParseIntPipe,
		)
		tagId: number,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "addTagToTransaction", "transactionId"),
			ParseIntPipe,
		)
		transactionId: number,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "addTagToTransaction">
	> {
		return await this.tagsService.addTagToTransaction(
			userId,
			tagId,
			transactionId,
		);
	}

	@ApiOperation({ summary: "Remove a tag from a transaction" })
	@Endpoint(MY_TAGS_CONTROLLER, "removeTagFromTransaction")
	async removeTagFromTransaction(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "removeTagFromTransaction", "tagId"),
			ParseIntPipe,
		)
		tagId: number,
		@Param(
			getParamName(
				MY_TAGS_CONTROLLER,
				"removeTagFromTransaction",
				"transactionId",
			),
			ParseIntPipe,
		)
		transactionId: number,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "removeTagFromTransaction">
	> {
		return await this.tagsService.removeTagFromTransaction(
			userId,
			tagId,
			transactionId,
		);
	}

	@ApiOperation({ summary: "Get all tags assigned to a transaction" })
	@Endpoint(MY_TAGS_CONTROLLER, "getTagsByTransaction")
	async getTransactionTags(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "getTagsByTransaction", "transactionId"),
			ParseIntPipe,
		)
		transactionId: number,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "getTagsByTransaction">
	> {
		return {
			tags: await this.tagsService.getUserTagsByTransactionId(
				userId,
				transactionId,
			),
		};
	}

	// #region Auto matchers

	@Endpoint(MY_TAGS_CONTROLLER, "getTagAutoMatchsList")
	async getTagAutoMatchsList(
		@ValidatedQuery(MY_TAGS_CONTROLLER, "getTagAutoMatchsList")
		query: InferQueryDto<typeof MY_TAGS_CONTROLLER, "getTagAutoMatchsList">,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "getTagAutoMatchsList", "tagId"),
			ParseIntPipe,
		)
		tagId: number,
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "getTagAutoMatchsList">
	> {
		return await this.tagAutoMatcherService.getUserMatchersListByTagId(
			userId,
			tagId,
			query.pagination,
			query.search,
		);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "addTagAutoMatch")
	async addTagAutoMatch(
		@ValidatedBody(MY_TAGS_CONTROLLER, "addTagAutoMatch") body: InferBodyDto<
			typeof MY_TAGS_CONTROLLER,
			"addTagAutoMatch"
		>,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "addTagAutoMatch">> {
		await this.tagAutoMatcherService.createUserTagAutoMatcher(userId, body);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "removeTagAutoMatch")
	async removeTagAutoMatch(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "removeTagAutoMatch", "autoMatchId"),
			ParseIntPipe,
		)
		id: number,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "removeTagAutoMatch">
	> {
		await this.tagAutoMatcherService.deleteUserTagAutoMatcher(userId, id);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "updateTagAutoMatch")
	async updateTagAutoMatch(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_TAGS_CONTROLLER, "updateTagAutoMatch", "autoMatchId"),
			ParseIntPipe,
		)
		id: number,
		@ValidatedBody(MY_TAGS_CONTROLLER, "updateTagAutoMatch") body: InferBodyDto<
			typeof MY_TAGS_CONTROLLER,
			"updateTagAutoMatch"
		>,
	): Promise<
		InferResponseDto<typeof MY_TAGS_CONTROLLER, "updateTagAutoMatch">
	> {
		await this.tagAutoMatcherService.updateUserTagAutoMatcher(userId, id, body);
	}

	// #endregion
}
