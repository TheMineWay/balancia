import { Module } from "@nestjs/common";
import { AccountsService } from "src/features/finances/accounts/accounts.service";
import { MyAccountsController } from "src/features/finances/accounts/my-accounts.controller";
import { AccountsRepository } from "src/features/finances/accounts/repositories/accounts.repository";

@Module({
	providers: [AccountsService, AccountsRepository],
	exports: [AccountsService],
	controllers: [MyAccountsController],
})
export class AccountsModule {}
