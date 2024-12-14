import { ENV } from "@constants/conf/env.constant";
import { Global, Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";
import { DatabaseService } from "src/database/services/database.service";

export const DATABASE_PROVIDERS = {
  main: "main_db_provider",
};

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
  ],
  exports: [...Object.values(DATABASE_PROVIDERS)],
})
export class DatabaseModule {}
