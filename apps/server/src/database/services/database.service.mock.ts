import type * as schema from "@database/schemas/main.schema";
import type { DatabaseService } from "@database/services/database.service";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";

export const DATABASE_SERVICE_MOCK = {
	db: {} as unknown as PgDatabase<PgQueryResultHKT, typeof schema>,
} as unknown as DatabaseService;
