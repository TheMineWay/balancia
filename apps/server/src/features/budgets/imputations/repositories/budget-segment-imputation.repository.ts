import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS,
	type BudgetSegmentImputationInsert,
	type BudgetSegmentImputationSelect,
	type BudgetSegmentImputationUpdate,
	budgetSegmentImputationTable,
} from "@database/schemas/main/tables/budget/budget-segment-imputation.table";
import { Injectable } from "@nestjs/common";
import type { BudgetSegmentImputationModel } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class BudgetSegmentImputationRepository extends Repository {
	async findById(
		id: BudgetSegmentImputationModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const found = await this.query(options)
			.select()
			.from(budgetSegmentImputationTable)
			.where(eq(budgetSegmentImputationTable.id, id))
			.limit(1);

		return found[0] ?? null;
	}

	async create(
		data: BudgetSegmentImputationInsert,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const created = await this.query(options)
			.insert(budgetSegmentImputationTable)
			.values([data])
			.returning(BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS);

		return created[0] ?? null;
	}

	async updateById(
		id: BudgetSegmentImputationModel["id"],
		data: BudgetSegmentImputationUpdate,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const updated = await this.query(options)
			.update(budgetSegmentImputationTable)
			.set(data)
			.where(eq(budgetSegmentImputationTable.id, id))
			.returning(BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS);
		return updated[0] ?? null;
	}

	async deleteById(
		id: BudgetSegmentImputationModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetSegmentImputationTable)
			.where(eq(budgetSegmentImputationTable.id, id));
	}
}
