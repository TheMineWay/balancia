import * as schema from "@database/schemas/main.schema";
import { Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2/driver";

// Built for Drizzle ORM

@Injectable()
export class DatabaseService<
	TSchema extends Record<string, unknown> = typeof schema,
> {
	constructor(public readonly db: MySql2Database<TSchema>) {}
}
