import { Module } from "@nestjs/common";
import { DebtsService } from "src/features/debts/debts.service";
import { MyDebtsController } from "src/features/debts/my-debts.controller";
import { DebtOriginRepository } from "src/features/debts/repositories/debt-origin.repository";
import { DebtPaymentsRepository } from "src/features/debts/repositories/debt-payments.repository";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";
import { AccountsModule } from "src/features/finances/accounts/accounts.module";

@Module({
	controllers: [MyDebtsController],
	providers: [
		DebtsService,
		DebtsRepository,
		DebtOriginRepository,
		DebtPaymentsRepository,
	],
	exports: [DebtsService],
	imports: [AccountsModule],
})
export class DebtsModule {}
