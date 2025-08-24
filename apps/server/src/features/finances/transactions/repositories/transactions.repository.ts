import { type QueryOptions, Repository } from "@database/repository/repository";
import { transactionsTable } from "@database/schemas/main.schema";
import { Injectable } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { desc, eq } from "drizzle-orm";

@Injectable()
export class TransactionsRepository extends Repository {
	async paginatedFindTransactionsByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
		options?: QueryOptions,
	): Promise<PaginatedResponse<OwnedModel<TransactionModel>>> {
		const query = this.query(options)
			.select()
			.from(transactionsTable)
			.where(eq(transactionsTable.userId, userId))
			.orderBy(desc(transactionsTable.performedAt))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return {
			items,
			total,
		};
	}
}
