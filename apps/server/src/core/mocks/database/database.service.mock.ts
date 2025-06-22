import { DatabaseService } from "@database/services/database.service";
import { MySql2Database } from "drizzle-orm/mysql2";

export const DATABASE_SERVICE_MOCK = {
  db: {} as unknown as MySql2Database,
} as unknown as DatabaseService;
