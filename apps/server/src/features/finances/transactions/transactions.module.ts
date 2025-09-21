import { Module } from "@nestjs/common";
import { AccountsModule } from "src/features/finances/accounts/accounts.module";
import { CategoriesRepository } from "src/features/finances/categories/repositories/categories.repository";
import { MyTransactionsController } from "src/features/finances/transactions/my-transactions.controller";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Module({
	providers: [
		TransactionsService,
		TransactionsRepository,
		CategoriesRepository,
	],
	exports: [TransactionsService],
	controllers: [MyTransactionsController],
	imports: [AccountsModule],
})
export class TransactionsModule {}
