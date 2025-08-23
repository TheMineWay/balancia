import { ENV } from "@constants/conf/env.constant";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import type * as schema from "@database/schemas/main.schema";
import { DatabaseService } from "@database/services/database.service";
import { DatabaseSeederService } from "@database/services/seeders/database-seeder.service";
import { Global, Logger, Module } from "@nestjs/common";
import { Logger as DbLogger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { Pool } from "pg";

@Global()
@Module({
	providers: [
		{
			provide: DATABASE_PROVIDERS.main,
			useFactory: () => {
				const pool = new Pool({
					connectionString: ENV.database.url,
					max: ENV.database.connectionLimit,
					min: 1,
					ssl: {
						rejectUnauthorized: ENV.database.sslRejectUnauthorized,
					},
				});

				const db = drizzle(pool, {
					logger: ENV.database.logQueries ? new DatabaseLogger() : undefined,
				});

				return new DatabaseService(
					db as unknown as PgDatabase<PgQueryResultHKT, typeof schema>,
				);
			},
		},
		DatabaseSeederService,
	],
	exports: [...Object.values(DATABASE_PROVIDERS)],
})
export class DatabaseModule {}

class DatabaseLogger implements DbLogger {
	logQuery(query: string, params: unknown[]): void {
		Logger.debug(
			`Query: ${query} | Params: ${JSON.stringify(params)}`,
			"DatabaseLogger",
		);
	}
}
