import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class UserIntegrationService {
  constructor(private readonly authDirectoryService: AuthDirectoryService) {}

  //@Cron("0 3 * * *") // Runs every day at 3:00 AM
  @Cron(CronExpression.EVERY_10_MINUTES) // TODO: remove
  async syncUsersWithOidcDirectory() {
    Logger.log("Syncing users with OIDC directory...");

    const users = await this.authDirectoryService.getUsers();
    console.log(users);
  }
}
