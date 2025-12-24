import { Module } from "@nestjs/common";
import { BudgetsService } from "src/features/budgets/budgets.service";
import { MyBudgetsController } from "src/features/budgets/my-budgets.controller";
import { BudgetsRepository } from "src/features/budgets/repositories/budgets.repository";
import { UserBudgetsService } from "src/features/budgets/user-budgets.service";

@Module({
	providers: [BudgetsService, UserBudgetsService, BudgetsRepository],
	exports: [BudgetsService, UserBudgetsService],
	controllers: [MyBudgetsController],
})
export class BudgetsModule {}
