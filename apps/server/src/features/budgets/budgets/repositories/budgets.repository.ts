import { type QueryOptions, Repository } from "@database/repository/repository";
import { budgetTable } from "@database/schemas/main.schema";
import {
	BUDGET_TABLE_COLUMNS,
	type BudgetInsert,
	type BudgetSelect,
	BudgetUpdate,
} from "@database/schemas/main/tables/budget/budget.table";
import { Injectable } from "@nestjs/common";
import type {
	BudgetFiltersModel,
	BudgetModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import {
	and,
	desc,
	eq,
	gte,
	ilike,
	lte,
	or,
	type SQLWrapper,
} from "drizzle-orm";

@Injectable()
export class BudgetsRepository extends Repository {
	async findUserList(
		userId: UserModelId,
		{ search, pagination }: PaginatedSearchModel,
		filters?: BudgetFiltersModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<BudgetSelect>> {
		const conditions: (SQLWrapper | undefined)[] = [];

		if (search?.search) {
			conditions.push(
				or(
					ilike(budgetTable.name, `%${search.search}%`),
					ilike(budgetTable.description, `%${search.search}%`),
				),
			);
		}

		if (filters) {
			if (filters.fromDate) {
				conditions.push(gte(budgetTable.fromDate, filters.fromDate));
			}
			if (filters.toDate) {
				conditions.push(lte(budgetTable.toDate, filters.toDate));
			}
		}

		const query = this.query(options)
			.select(BUDGET_TABLE_COLUMNS)
			.from(budgetTable)
			.where(and(eq(budgetTable.userId, userId), ...conditions))
			.orderBy(desc(budgetTable.id))
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

	async findById(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSelect | null> {
		return (
			(
				await this.query(options)
					.select(BUDGET_TABLE_COLUMNS)
					.from(budgetTable)
					.where(eq(budgetTable.id, budgetId))
			)?.[0] || null
		);
	}

	async create(
		data: BudgetInsert,
		options?: QueryOptions,
	): Promise<BudgetSelect | null> {
		const created = await this.query(options)
			.insert(budgetTable)
			.values([data])
			.returning(BUDGET_TABLE_COLUMNS);
		return created?.[0] || null;
	}

	async updateById(
		budgetId: BudgetModel["id"],
		data: BudgetUpdate,
		options?: QueryOptions,
	): Promise<BudgetSelect | null> {
		const updated = await this.query(options)
			.update(budgetTable)
			.set(data)
			.where(eq(budgetTable.id, budgetId))
			.returning(BUDGET_TABLE_COLUMNS);
		return updated?.[0] || null;
	}

	async deleteById(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetTable)
			.where(eq(budgetTable.id, budgetId));
	}
}
