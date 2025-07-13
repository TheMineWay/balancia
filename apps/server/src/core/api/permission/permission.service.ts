import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PermissionService {
  constructor(
    @Inject(DATABASE_PROVIDERS.main)
    private readonly databaseService: DatabaseService,
  ) {}
}
