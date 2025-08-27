import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import {
	getController,
	getParamName,
	InferBodyDto,
	InferQueryDto,
	InferResponseDto,
	MY_CATEGORY_CONTROLLER,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { CategoriesService } from "src/features/finances/categories/categories.service";

@Controller(getController(MY_CATEGORY_CONTROLLER, {}))
export class MyCategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Endpoint(MY_CATEGORY_CONTROLLER, "getCategories")
	async getCategories(
		@ValidatedQuery(MY_CATEGORY_CONTROLLER, "getCategories")
		query: InferQueryDto<typeof MY_CATEGORY_CONTROLLER, "getCategories">,
		@UserId() userId: UserModel["id"],
	): Promise<InferResponseDto<typeof MY_CATEGORY_CONTROLLER, "getCategories">> {
		return await this.categoriesService.getPaginatedCategoriesByUserId(
			userId,
			query,
		);
	}

	@Endpoint(MY_CATEGORY_CONTROLLER, "createCategory")
	async createCategory(
		@UserId() userId: UserModel["id"],
		@ValidatedBody(MY_CATEGORY_CONTROLLER, "createCategory") body: InferBodyDto<
			typeof MY_CATEGORY_CONTROLLER,
			"createCategory"
		>,
	): Promise<
		InferResponseDto<typeof MY_CATEGORY_CONTROLLER, "createCategory">
	> {
		await this.categoriesService.create(userId, body);
	}

	@Endpoint(MY_CATEGORY_CONTROLLER, "deleteCategory")
	async deleteCategory(
		@Param(
			getParamName(MY_CATEGORY_CONTROLLER, "deleteCategory", "id"),
			ParseIntPipe,
		)
		categoryId: number,
		@UserId() userId: UserModel["id"],
	): Promise<
		InferResponseDto<typeof MY_CATEGORY_CONTROLLER, "deleteCategory">
	> {
		await this.categoriesService.deleteByUserIdAndId(userId, categoryId);
	}

	@Endpoint(MY_CATEGORY_CONTROLLER, "updateCategory")
	async updateCategory(
		@Param(
			getParamName(MY_CATEGORY_CONTROLLER, "updateCategory", "id"),
			ParseIntPipe,
		)
		categoryId: number,
		@ValidatedBody(MY_CATEGORY_CONTROLLER, "updateCategory") body: InferBodyDto<
			typeof MY_CATEGORY_CONTROLLER,
			"updateCategory"
		>,
		@UserId() userId: UserModel["id"],
	): Promise<
		InferResponseDto<typeof MY_CATEGORY_CONTROLLER, "updateCategory">
	> {
		await this.categoriesService.updateByUserIdAndId(userId, categoryId, body);
	}
}
