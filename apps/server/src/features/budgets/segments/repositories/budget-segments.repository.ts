import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	BUDGET_SEGMENT_TABLE_COLUMNS,
	type BudgetSegmentInsert,
	type BudgetSegmentSelect,
	type BudgetSegmentUpdate,
	budgetSegmentTable,
} from "@database/schemas/main/tables/budget/budget-segment.table";
import { budgetTable } from "@database/schemas/main/tables/budget/budget.table";
import { Injectable } from "@nestjs/common";
import type {
	BudgetModel,
	BudgetSegmentModel,
	UserModelId,
} from "@shared/models";
import { and, count, desc, eq, sum } from "drizzle-orm";

@Injectable()
export class BudgetSegmentsRepository extends Repository {
	async findByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect[]> {
		return await this.query(options)
			.select(BUDGET_SEGMENT_TABLE_COLUMNS)
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.orderBy(desc(budgetSegmentTable.id));
	}

	async findById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		return (
			(
				await this.query(options)
					.select(BUDGET_SEGMENT_TABLE_COLUMNS)
					.from(budgetSegmentTable)
					.where(eq(budgetSegmentTable.id, segmentId))
			)?.[0] || null
		);
	}

	async create(
		data: BudgetSegmentInsert,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const created = await this.query(options)
			.insert(budgetSegmentTable)
			.values([data])
			.returning(BUDGET_SEGMENT_TABLE_COLUMNS);
		return created?.[0] || null;
	}

	async updateById(
		segmentId: BudgetSegmentModel["id"],
		data: BudgetSegmentUpdate,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const updated = await this.query(options)
			.update(budgetSegmentTable)
			.set(data)
			.where(eq(budgetSegmentTable.id, segmentId))
			.returning(BUDGET_SEGMENT_TABLE_COLUMNS);
		return updated?.[0] || null;
	}

	async deleteById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetSegmentTable)
			.where(eq(budgetSegmentTable.id, segmentId));
	}

	async findByIdAndUserId(
		segmentId: BudgetSegmentModel["id"],
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const result = await this.query(options)
			.select(BUDGET_SEGMENT_TABLE_COLUMNS)
			.from(budgetSegmentTable)
			.innerJoin(budgetTable, eq(budgetSegmentTable.budgetId, budgetTable.id))
			.where(
				and(
					eq(budgetSegmentTable.id, segmentId),
					eq(budgetTable.userId, userId),
				),
			)
			.limit(1);

		return result?.[0] || null;
	}

	// #region Stats

	async getTotalPercentByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<number> {
		const result = await this.query(options)
			.select({ totalPercent: sum(budgetSegmentTable.percent) })
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.limit(1);

		const count = result?.[0]?.totalPercent;
		if (typeof count === "string") return +count;
		return 0;
	}

	// # endregion

	/**
	 * Counts the number of segments for a given budget ID.
	 */
	async countByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<number> {
		const result = await this.query(options)
			.select({ count: count() })
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.limit(1);

		return result?.[0]?.count || 0;
	}
}
