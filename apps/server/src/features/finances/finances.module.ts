import { Module } from "@nestjs/common";
import { AccountsModule } from "src/features/finances/accounts/accounts.module";
import { CategoriesModule } from "src/features/finances/categories/categories.module";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	imports: [TransactionsModule, CategoriesModule, AccountsModule],
})
export class FinancesModule {}
