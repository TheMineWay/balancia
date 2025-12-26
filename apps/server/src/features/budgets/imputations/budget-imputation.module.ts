import { Module } from "@nestjs/common";
import { BudgetImputationService } from "src/features/budgets/imputations/budget-imputation.service";
import { BudgetSegmentImputationRepository } from "src/features/budgets/imputations/repositories/budget-segment-imputation.repository";
import { UserBudgetImputationService } from "src/features/budgets/imputations/user-budget-imputation.service";
import { BudgetSegmentsModule } from "src/features/budgets/segments/budget-segments.module";

@Module({
	providers: [
		BudgetImputationService,
		UserBudgetImputationService,
		BudgetSegmentImputationRepository,
	],
	exports: [BudgetImputationService, UserBudgetImputationService],
	imports: [BudgetSegmentsModule],
})
export class BudgetImputationModule {}
