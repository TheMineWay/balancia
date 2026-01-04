import { Module } from "@nestjs/common";
import { BudgetSegmentAutomationsService } from "src/features/budgets/automations/budget-segment-automations.service";
import { MyBudgetAutomationsController } from "src/features/budgets/automations/my-budget-automations.controller";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";
import { UserBudgetSegmentAutomationsService } from "src/features/budgets/automations/user-budget-segment-automations.service";
import { BudgetSegmentsModule } from "src/features/budgets/segments/budget-segments.module";
import { CategoriesModule } from "src/features/finances/categories/categories.module";

@Module({
	imports: [CategoriesModule, BudgetSegmentsModule],
	providers: [
		// Services
		BudgetSegmentAutomationsService,
		UserBudgetSegmentAutomationsService,

		// Repositories
		BudgetSegmentCategoryAutoMatcherRepository,
	],
	exports: [
		BudgetSegmentAutomationsService,
		UserBudgetSegmentAutomationsService,
	],
	controllers: [MyBudgetAutomationsController],
})
export class BudgetAutomationsModule {}
