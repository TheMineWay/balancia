import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserProfileService],
})
export class UserProfileModule {}
