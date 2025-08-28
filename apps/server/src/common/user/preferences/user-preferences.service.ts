import { DATABASE_PROVIDERS } from "@database/database.provider";
import { UserPreferencesSelect } from "@database/schemas/main/tables/identity/user-preferences.table";
import { DatabaseService } from "@database/services/database.service";
import {
	Inject,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import {
	UserModelId,
	UserPreferencesCreateModel,
	UserPreferencesModel,
} from "@shared/models";
import { UserPreferencesRepository } from "src/common/user/preferences/repositories/user-preferences.repository";

@Injectable()
export class UserPreferencesService {
	constructor(
		private readonly userPreferencesRepository: UserPreferencesRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async getByUserId(userId: UserModelId): Promise<UserPreferencesModel | null> {
		return await this.userPreferencesRepository.findByUserId(userId);
	}

	async upsertByUserId(
		userId: UserModelId,
		preferences: Omit<UserPreferencesCreateModel, "userId">,
	): Promise<UserPreferencesSelect> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const existing = await this.userPreferencesRepository.findByUserId(
				userId,
				{ transaction },
			);

			if (existing) {
				await this.userPreferencesRepository.updateByUserId(
					userId,
					preferences,
					{ transaction },
				);
				const updated = await this.userPreferencesRepository.findByUserId(
					userId,
					{
						transaction,
					},
				);
				if (updated) return updated;

				// If the updated preferences are not found, throw an error
				throw new InternalServerErrorException();
			}

			return await this.userPreferencesRepository.create(
				{ userId, ...preferences },
				{ transaction },
			);
		});
	}
}
