import { Module } from "@nestjs/common";
import { BudgetsModule } from "src/features/budgets/budgets/budgets.module";
import { BudgetSegmentsService } from "src/features/budgets/segments/budget-segments.service";
import { MyBudgetSegmentsController } from "src/features/budgets/segments/my-budget-segments.controller";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";

@Module({
	imports: [BudgetsModule],
	providers: [
		BudgetSegmentsService,
		UserBudgetSegmentsService,
		BudgetSegmentsRepository,
	],
	exports: [BudgetSegmentsService, UserBudgetSegmentsService],
	controllers: [MyBudgetSegmentsController],
})
export class BudgetSegmentsModule {}
