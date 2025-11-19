import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	DebtOriginInsert,
	debtOriginTable,
} from "@database/schemas/main/tables/debt/debt-origin.table";
import type { DebtModel } from "@shared/models";
import { eq } from "drizzle-orm";

export class DebtOriginRepository extends Repository {
	async removeByDebt(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(debtOriginTable)
			.where(eq(debtOriginTable.debtId, debtId));
	}

	async bulkCreate(
		items: DebtOriginInsert[],
		options?: QueryOptions,
	): Promise<void> {
		if (items.length === 0) return;
		await this.query(options).insert(debtOriginTable).values(items);
	}
}
