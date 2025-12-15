import { isMasterServer } from "@core/__lib__/global.utils";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import { Transaction } from "@database/repository/repository";
import { permissionTable } from "@database/schemas/main.schema";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { PERMISSIONS } from "@shared/models";
import { inArray } from "drizzle-orm";

@Injectable()
export class DatabaseSeederService {
	private readonly logger = new Logger("DB Seeder");

	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {
		if (!isMasterServer()) return;
		this.seed();
	}

	async seed() {
		this.logger.log("Seeding database...");

		await this.databaseService.db.transaction(async (t: Transaction) => {
			await seedPermissions(t);
		});

		this.logger.log("Database seeding completed.");
	}
}

/* Seeds */

const seedPermissions = async (t: Transaction) => {
	const existingPermissions = await t
		.select({
			code: permissionTable.code,
		})
		.from(permissionTable);

	// Delete permissions that are no longer in the PERMISSIONS array
	const toDelete = existingPermissions.filter(
		(p) => !PERMISSIONS.includes(p.code),
	);

	if (toDelete.length > 0) {
		Logger.debug(
			`Deleting ${toDelete.length} obsolete permissions... (${toDelete
				.map((p) => p.code)
				.join(", ")})`,
		);
		await t.delete(permissionTable).where(
			inArray(
				permissionTable.code,
				toDelete.map((p) => p.code),
			),
		);
	}

	// Create missing permissions
	const toCreate = PERMISSIONS.filter(
		(p) => !existingPermissions.some((ep) => ep.code === p),
	);

	if (toCreate.length > 0) {
		Logger.debug(
			`Creating ${toCreate.length} new permissions... (${toCreate.join(", ")})`,
		);
		await t.insert(permissionTable).values(
			toCreate.map((code) => ({
				code,
			})),
		);
	}
};
