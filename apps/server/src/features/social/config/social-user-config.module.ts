import { Module } from "@nestjs/common";
import { SocialUserConfigRepository } from "src/features/social/config/repository/social-user-config.repository";
import { SocialUserConfigService } from "src/features/social/config/social-user-config.service";

@Module({
	providers: [SocialUserConfigService, SocialUserConfigRepository],
	exports: [SocialUserConfigService],
})
export class SocialUserConfigModule {}
