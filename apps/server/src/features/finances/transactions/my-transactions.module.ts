import { Module } from "@nestjs/common";
import { MyTransactionsController } from "src/features/finances/transactions/my-transactions.controller";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	controllers: [MyTransactionsController],
	imports: [TransactionsModule],
})
export class MyTransactionsModule {}
