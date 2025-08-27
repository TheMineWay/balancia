import { Module } from "@nestjs/common";
import { CategoriesModule } from "src/features/finances/categories/categories.module";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	imports: [TransactionsModule, CategoriesModule],
})
export class FinancesModule {}
