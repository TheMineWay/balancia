import { ENV } from "@constants/conf/env.constant";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { DatabaseSeederService } from "@database/services/seeders/database-seeder.service";
import { Global, Logger, Module } from "@nestjs/common";
import { Logger as DbLogger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_PROVIDERS.main,
      useFactory: () => {
        const db = drizzle(ENV.database.url, {
          logger: new DatabaseLogger(),
        });
        return new DatabaseService(db);
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
