import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import {
	Controller,
	NotFoundException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	getParamName,
	type InferBodyDto,
	type InferQueryDto,
	type InferResponseDto,
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

	@ApiOperation({ summary: "Get paginated list of user categories" })
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

	@ApiOperation({ summary: "Get details of a specific user category" })
	@Endpoint(MY_CATEGORY_CONTROLLER, "getCategory")
	async getCategory(
		@Param(
			getParamName(MY_CATEGORY_CONTROLLER, "getCategory", "id"),
			ParseIntPipe,
		)
		categoryId: number,
		@UserId() userId: UserModel["id"],
	): Promise<InferResponseDto<typeof MY_CATEGORY_CONTROLLER, "getCategory">> {
		const category = await this.categoriesService.getUserCategoryById(
			userId,
			categoryId,
		);

		if (!category) throw new NotFoundException();
		return category;
	}

	@ApiOperation({ summary: "Create a new user category" })
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
		await this.categoriesService.userCreate(userId, body);
	}

	@ApiOperation({ summary: "Delete a user category" })
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
		await this.categoriesService.userDeleteById(userId, categoryId);
	}

	@ApiOperation({ summary: "Update an existing user category" })
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
		await this.categoriesService.userUpdateById(userId, categoryId, body);
	}
}
