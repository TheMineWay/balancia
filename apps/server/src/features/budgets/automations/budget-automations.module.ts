import { Module } from "@nestjs/common";
import { BudgetSegmentAutomationsService } from "src/features/budgets/automations/budget-segment-automations.service";
import { MyBudgetAutomationsController } from "src/features/budgets/automations/my-budget-automations.controller";
import { BudgetSegmentAutoImputationHistoryRepository } from "src/features/budgets/automations/repositories/budget-segment-auto-imputation-history.repository";
import { BudgetSegmentCategoryAutoImputationHistoryRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-imputation-history.repository";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";
import { UserBudgetSegmentAutomationsService } from "src/features/budgets/automations/user-budget-segment-automations.service";
import { BudgetImputationModule } from "src/features/budgets/imputations/budget-imputation.module";
import { BudgetSegmentsModule } from "src/features/budgets/segments/budget-segments.module";
import { CategoriesModule } from "src/features/finances/categories/categories.module";

@Module({
	imports: [CategoriesModule, BudgetSegmentsModule, BudgetImputationModule],
	providers: [
		// Services
		BudgetSegmentAutomationsService,
		UserBudgetSegmentAutomationsService,

		// Repositories
		BudgetSegmentCategoryAutoMatcherRepository,
		BudgetSegmentAutoImputationHistoryRepository,
		BudgetSegmentCategoryAutoImputationHistoryRepository,
	],
	exports: [
		BudgetSegmentAutomationsService,
		UserBudgetSegmentAutomationsService,
	],
	controllers: [MyBudgetAutomationsController],
})
export class BudgetAutomationsModule {}
