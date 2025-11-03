import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller } from "@nestjs/common";
import {
	getController,
	type InferQueryDto,
	type InferResponseDto,
	MY_DEBTS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { DebtsService } from "src/features/debts/debts.service";

@Controller(getController(MY_DEBTS_CONTROLLER, {}))
export class MyDebtsController {
	constructor(private readonly debtsService: DebtsService) {}

	@Endpoint(MY_DEBTS_CONTROLLER, "getDebts")
	async getDebtsList(
		@UserId() userId: UserModelId,
		@ValidatedQuery(MY_DEBTS_CONTROLLER, "getDebts") query: InferQueryDto<
			typeof MY_DEBTS_CONTROLLER,
			"getDebts"
		>,
	): Promise<InferResponseDto<typeof MY_DEBTS_CONTROLLER, "getDebts">> {
		return await this.debtsService.findList(userId, query);
	}
}
