import { Module } from "@nestjs/common";
import { BudgetsModule } from "src/features/budgets/budgets/budgets.module";
import { BudgetSegmentsService } from "src/features/budgets/segments/budget-segments.service";
import { MyBudgetSegmentsController } from "src/features/budgets/segments/my-budget-segments.controller";
import { BudgetSegmentImputationsRepository } from "src/features/budgets/segments/repositories/budget-segment-imputations.repository";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	imports: [BudgetsModule, TransactionsModule],
	providers: [
		BudgetSegmentsService,
		UserBudgetSegmentsService,
		BudgetSegmentsRepository,
		BudgetSegmentImputationsRepository,
	],
	exports: [BudgetSegmentsService, UserBudgetSegmentsService],
	controllers: [MyBudgetSegmentsController],
})
export class BudgetSegmentsModule {}
