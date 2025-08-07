import { DATABASE_PROVIDERS } from "@database/database.provider";
import { Transaction } from "@database/repository/core/repository";
import { permissionTable } from "@database/schemas/main.schema";
import { DatabaseService } from "@database/services/database.service";
import {
	Inject,
	Injectable,
	Logger,
	OnApplicationBootstrap,
} from "@nestjs/common";
import { PERMISSIONS } from "@shared/models";
import { inArray } from "drizzle-orm";

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async onApplicationBootstrap() {
		Logger.log("Seeding database...", "DB Seeder");

		await this.databaseService.db.transaction(async (t: Transaction) => {
			await seedPermissions(t);
		});
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
