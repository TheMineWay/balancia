import { AuthDirectoryModule } from "@external/auth-directory/auth-directory.module";
import { Module } from "@nestjs/common";
import { UserIntegrationService } from "src/integrations/user/user-integration.service";

@Module({
	imports: [AuthDirectoryModule],
	providers: [UserIntegrationService],
})
export class UserIntegrationModule {}
