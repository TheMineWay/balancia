import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS,
	type BudgetSegmentImputationInsert,
	type BudgetSegmentImputationSelect,
	BudgetSegmentImputationUpdate,
	budgetSegmentImputationTable,
} from "@database/schemas/main/tables/budget/budget-segment-imputation.table";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

@Injectable()
export class BudgetSegmentImputationsRepository extends Repository {
	async findById(
		id: BudgetSegmentImputationSelect["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const result = await this.query(options)
			.select(BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS)
			.from(budgetSegmentImputationTable)
			.where(eq(budgetSegmentImputationTable.id, id))
			.limit(1);

		return result[0] ?? null;
	}

	async create(
		data: BudgetSegmentImputationInsert,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const result = await this.query(options)
			.insert(budgetSegmentImputationTable)
			.values([data])
			.returning(BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS);

		return result[0] ?? null;
	}

	async updateById(
		id: BudgetSegmentImputationSelect["id"],
		data: BudgetSegmentImputationUpdate,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationSelect | null> {
		const result = await this.query(options)
			.update(budgetSegmentImputationTable)
			.set(data)
			.where(eq(budgetSegmentImputationTable.id, id))
			.returning(BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS);

		return result[0] ?? null;
	}

	async deleteById(
		id: BudgetSegmentImputationSelect["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetSegmentImputationTable)
			.where(eq(budgetSegmentImputationTable.id, id));
	}
}
