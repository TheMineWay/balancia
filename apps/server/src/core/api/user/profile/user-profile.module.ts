import { UserProfileController } from "@core/api/user/profile/user-profile.controller";
import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserProfileService],
  exports: [UserProfileService],
  controllers: [UserProfileController],
  imports: [UserModule],
})
export class UserProfileModule {}
