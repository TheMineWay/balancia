import { Module } from "@nestjs/common";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Module({
	providers: [TransactionsService, TransactionsRepository],
	exports: [TransactionsService],
})
export class TransactionsModule {}
