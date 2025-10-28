import { Module } from "@nestjs/common";
import { DebtsService } from "src/features/debts/debts.service";
import { MyDebtsController } from "src/features/debts/my-debts.controller";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";

@Module({
	controllers: [MyDebtsController],
	providers: [DebtsService, DebtsRepository],
	exports: [DebtsService],
})
export class DebtsModule {}
