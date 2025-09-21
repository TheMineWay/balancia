import { Module } from "@nestjs/common";
import { AccountsModule } from "src/features/finances/accounts/accounts.module";
import { CategoriesModule } from "src/features/finances/categories/categories.module";
import { TagsModule } from "src/features/finances/tags/tags.module";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	imports: [TransactionsModule, CategoriesModule, AccountsModule, TagsModule],
})
export class FinancesModule {}
