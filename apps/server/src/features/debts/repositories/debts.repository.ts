import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	type DebtInsert,
	type DebtSelect,
	type DebtUpdate,
	debtTable,
} from "@database/schemas/main/tables/debt/debt.table";
import { Injectable } from "@nestjs/common";
import type { DebtModel } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class DebtsRepository extends Repository {
	async findById(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	): Promise<DebtSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(debtTable)
					.where(eq(debtTable.id, debtId))
					.limit(1)
			)?.[0] ?? null
		);
	}

	async create(data: DebtInsert, options?: QueryOptions) {
		return await this.query(options).insert(debtTable).values(data);
	}

	async updateById(
		debtId: DebtModel["id"],
		data: DebtUpdate,
		options?: QueryOptions,
	) {
		return await this.query(options)
			.update(debtTable)
			.set(data)
			.where(eq(debtTable.id, debtId));
	}

	async deleteById(debtId: DebtModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(debtTable)
			.where(eq(debtTable.id, debtId));
	}
}
