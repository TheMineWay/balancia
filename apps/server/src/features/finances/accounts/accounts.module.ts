import { Module } from "@nestjs/common";
import { AccountsRepository } from "src/features/finances/accounts/repositories/accounts.repository";

@Module({
	providers: [AccountsRepository],
})
export class AccountsModule {}
