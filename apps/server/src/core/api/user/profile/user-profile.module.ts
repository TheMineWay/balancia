import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserProfileService],
  imports: [UserModule],
})
export class UserProfileModule {}
