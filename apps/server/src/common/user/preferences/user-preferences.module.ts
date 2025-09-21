import { Module } from "@nestjs/common";
import { UserPreferencesRepository } from "src/common/user/preferences/repositories/user-preferences.repository";
import { UserPreferencesController } from "src/common/user/preferences/user-preferences.controller";
import { UserPreferencesService } from "src/common/user/preferences/user-preferences.service";

@Module({
	controllers: [UserPreferencesController],
	providers: [UserPreferencesService, UserPreferencesRepository],
	exports: [UserPreferencesService],
})
export class UserPreferencesModule {}
