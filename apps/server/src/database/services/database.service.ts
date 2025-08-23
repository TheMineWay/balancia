import type * as schema from "@database/schemas/main.schema";
import { Injectable } from "@nestjs/common";
import { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";

// Built for Drizzle ORM

/**
 * Database service that provides a generic wrapper around Drizzle ORM.
 * Provides type-safe database access with customizable schema support.
 */
@Injectable()
export class DatabaseService<
	TSchema extends Record<string, unknown> = typeof schema,
> {
	constructor(public readonly db: PgDatabase<PgQueryResultHKT, TSchema>) {}
}
