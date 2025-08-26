import { Injectable } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	TransactionCreateModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	async getPaginatedTransactionsByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
	): Promise<PaginatedResponse<OwnedModel<TransactionModel>>> {
		return await this.transactionsRepository.paginatedFindTransactionsByUserId(
			userId,
			pagination,
		);
	}

	async createTransaction(
		userId: UserModel["id"],
		transaction: TransactionCreateModel,
	) {
		// TODO: if category is provided. Check if it is owned by the user
		return await this.transactionsRepository.create({ ...transaction, userId });
	}

	async updateTransaction(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		transaction: Partial<TransactionCreateModel>,
	) {
		// TODO: if category is provided. Check if it is owned by the user
		return await this.transactionsRepository.updateByIdAndUserId(
			userId,
			transactionId,
			transaction,
		);
	}

	async deleteTransaction(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
	) {
		return await this.transactionsRepository.deleteByUserIdAndId(
			userId,
			transactionId,
		);
	}
}
