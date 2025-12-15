import { type QueryOptions, Repository } from "@database/repository/repository";
import { userPreferencesTable } from "@database/schemas/main.schema";
import type {
	UserPreferencesInsert,
	UserPreferencesSelect,
	UserPreferencesUpdate,
} from "@database/schemas/main/tables/identity/user-preferences.table";
import { Injectable } from "@nestjs/common";
import type { UserModelId } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class UserPreferencesRepository extends Repository {
	async findByUserId(
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<UserPreferencesSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(userPreferencesTable)
					.where(eq(userPreferencesTable.userId, userId))
			)?.[0] ?? null
		);
	}

	async create(
		data: UserPreferencesInsert,
		options?: QueryOptions,
	): Promise<UserPreferencesSelect | null> {
		return (
			(
				await this.query(options)
					.insert(userPreferencesTable)
					.values(data)
					.returning()
			)?.[0] || null
		);
	}

	async updateByUserId(
		userId: UserModelId,
		data: UserPreferencesUpdate,
		options?: QueryOptions,
	) {
		return await this.query(options)
			.update(userPreferencesTable)
			.set(data)
			.where(eq(userPreferencesTable.userId, userId));
	}
}
