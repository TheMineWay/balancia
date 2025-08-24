import { Module } from "@nestjs/common";
import { MyTransactionsModule } from "src/features/finances/transactions/my-transactions.module";

@Module({
	imports: [MyTransactionsModule],
})
export class FinancesModule {}
