import { Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2/driver";

type QueryOptions = {
  transition?: string;
};

// Build for Drizzle ORM

@Injectable()
export class DatabaseService<
  TSchema extends Record<string, unknown> = Record<string, never>,
> {
  constructor(private readonly db: MySql2Database<TSchema>) {}

  query(options: QueryOptions) {}
}
