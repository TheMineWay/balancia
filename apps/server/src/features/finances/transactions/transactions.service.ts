import { Injectable } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	async getPaginatedTransactionsById(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
	): Promise<PaginatedResponse<OwnedModel<TransactionModel>>> {
		return await this.transactionsRepository.paginatedFindTransactionsByUserId(
			userId,
			pagination,
		);
	}
}
