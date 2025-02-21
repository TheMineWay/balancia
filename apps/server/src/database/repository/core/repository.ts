import { DATABASE_PROVIDERS } from "@database/database.module";
import { DatabaseService } from "@database/services/database.service";
import { Inject } from "@nestjs/common";

export type Transaction = Parameters<
  Parameters<DatabaseService["db"]["transaction"]>[0]
>[0];

export type QueryOptions = {
  transaction?: Transaction;
};

export abstract class Repository {
  constructor(
    @Inject(DATABASE_PROVIDERS.main)
    protected readonly dbService: DatabaseService,
  ) {}

  protected query = (options?: QueryOptions) =>
    options?.transaction || this.dbService.db;

  public transaction: typeof this.dbService.db.transaction = (options) =>
    this.dbService.db.transaction(options);
}
