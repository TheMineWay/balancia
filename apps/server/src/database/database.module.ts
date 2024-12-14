import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "src/database/services/database.service";

export const DATABASE_PROVIDERS = {
  main: "main_db_provider",
};

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_PROVIDERS.main,
      useFactory: async () => {
        return new DatabaseService();
      },
    },
  ],
  exports: [...Object.values(DATABASE_PROVIDERS)],
})
export class DatabaseModule {}
