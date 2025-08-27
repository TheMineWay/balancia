import { Module } from "@nestjs/common";
import { AccountsService } from "src/features/finances/accounts/accounts.service";
import { AccountsRepository } from "src/features/finances/accounts/repositories/accounts.repository";

@Module({
	providers: [AccountsService, AccountsRepository],
	exports: [AccountsService],
})
export class AccountsModule {}
