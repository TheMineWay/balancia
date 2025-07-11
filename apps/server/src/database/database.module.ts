import { ENV } from "@constants/conf/env.constant";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { DatabaseSeederService } from "@database/services/seeders/database-seeder.service";
import { Global, Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_PROVIDERS.main,
      useFactory: () => {
        const db = drizzle(ENV.database.url);
        return new DatabaseService(db);
      },
    },
    DatabaseSeederService,
  ],
  exports: [...Object.values(DATABASE_PROVIDERS)],
})
export class DatabaseModule {}
