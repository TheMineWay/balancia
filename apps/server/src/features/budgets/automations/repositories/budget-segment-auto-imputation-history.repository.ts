import { QueryOptions, Repository } from "@database/repository/repository";
import {
	BudgetSegmentAutoImputationHistoryInsert,
	budgetSegmentAutoImputationHistoryTable,
} from "@database/schemas/main/tables/budget/budget-segment-auto-imputation-history.table";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BudgetSegmentAutoImputationHistoryRepository extends Repository {
	async bulkCreate(
		data: BudgetSegmentAutoImputationHistoryInsert[],
		options?: QueryOptions,
	) {
		return this.query(options)
			.insert(budgetSegmentAutoImputationHistoryTable)
			.values(data);
	}
}
