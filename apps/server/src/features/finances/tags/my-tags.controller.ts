import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import {
	getController,
	getParamName,
	type InferQueryDto,
	type InferResponseDto,
	MY_TAGS_CONTROLLER,
} from "@shared/api-definition";
import { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { TagsService } from "src/features/finances/tags/tags.service";

@Controller(getController(MY_TAGS_CONTROLLER, {}))
export class MyTagsController {
	constructor(private readonly tagsService: TagsService) {}

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
		return await this.tagsService.getUserTagById(userId, id);
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
		await this.tagsService.updateUserTag(userId, id, body);
	}

	@Endpoint(MY_TAGS_CONTROLLER, "deleteTag")
	async deleteTag(
		@Param(getParamName(MY_TAGS_CONTROLLER, "deleteTag", "id"), ParseIntPipe)
		id: number,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_TAGS_CONTROLLER, "deleteTag">> {
		await this.tagsService.deleteUserTag(userId, id);
	}

	// Other

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
}
