import { ENV } from "@constants/conf/env.constant";
import { UserService } from "@core/auth/user/user.service";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

// How many users will be fetched per request
const SYNC_USERS_PER_REQUEST = ENV.authDirectory.syncBatchSize;

@Injectable()
export class UserIntegrationService {
	constructor(
		private readonly authDirectoryService: AuthDirectoryService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly userService: UserService,
	) {}

	@Cron("0 3 * * *") // Runs every day at 3:00 AM
	async syncUsersWithOidcDirectory() {
		Logger.log("Syncing users with OIDC directory...", "User integration");

		await this.databaseService.db.transaction(async (transaction) => {
			const pendingQueries: Promise<void>[] = []; // Stores promises for pending queries

			let nextPage: number | null = null;
			while (nextPage !== 0) {
				const users = await this.authDirectoryService.getUsers({
					page: nextPage ?? 1,
					pageSize: SYNC_USERS_PER_REQUEST,
				});
				nextPage = users.pagination.next;

				// Integrate users
				pendingQueries.push(
					this.userService.syncUsers(
						users.results
							.filter(
								(r) =>
									!["internal_service_account", "service_account"].includes(
										r.type,
									),
							)
							.map((r) => ({
								code: r.uid,
								name: r.name,
								username: r.username,
								email: r.email,
							})),
						{
							transaction,
						},
					),
				);
			}

			// Wait for queries to complete
			await Promise.all(pendingQueries);
		});

		Logger.log("User sync completed successfully", "User integration");
	}
}
