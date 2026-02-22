import { QueryOptions, Repository } from "@database/repository/repository";
import {
	BudgetSegmentCategoryAutoImputationHistoryInsert,
	budgetSegmentCategoryAutoImputationHistoryTable,
} from "@database/schemas/main/tables/budget/budget-segment-category-auto-imputation-history.table";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BudgetSegmentCategoryAutoImputationHistoryRepository extends Repository {
	async bulkCreate(
		data: BudgetSegmentCategoryAutoImputationHistoryInsert[],
		options?: QueryOptions,
	) {
		return this.query(options)
			.insert(budgetSegmentCategoryAutoImputationHistoryTable)
			.values(data);
	}
}
