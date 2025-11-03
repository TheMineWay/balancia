import { Module } from "@nestjs/common";
import { DebtsService } from "src/features/debts/debts.service";
import { MyDebtsController } from "src/features/debts/my-debts.controller";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";
import { AccountsModule } from "src/features/finances/accounts/accounts.module";

@Module({
	controllers: [MyDebtsController],
	providers: [DebtsService, DebtsRepository],
	exports: [DebtsService],
	imports: [AccountsModule],
})
export class DebtsModule {}
