import { Module } from "@nestjs/common";
import { UserIntegrationModule } from "src/integrations/user/user-integration.module";

@Module({
  imports: [UserIntegrationModule],
})
export class IntegrationModule {}
