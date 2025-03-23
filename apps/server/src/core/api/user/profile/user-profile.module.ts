import { UserProfileController } from "@core/api/user/profile/user-profile.controller";
import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
