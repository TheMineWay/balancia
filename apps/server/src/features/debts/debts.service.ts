import { Injectable } from "@nestjs/common";
import type { DebtCreateModel, DebtModel, UserModelId } from "@shared/models";

@Injectable()
export class DebtsService {
	async create(userId: UserModelId, debt: DebtCreateModel) {}

	async delete(userId: UserModelId, debtId: DebtModel["id"]) {}

	async findList(userId: UserModelId) {}

	async update(
		userId: UserModelId,
		debtId: DebtModel["id"],
		debt: DebtCreateModel,
	) {}
}
