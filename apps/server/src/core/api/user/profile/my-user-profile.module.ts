import { MyUserProfileController } from "@core/api/user/profile/my-user-profile.controller";
import { MyUserProfileService } from "@core/api/user/profile/my-user-profile.service";
import { UserRepository } from "@database/repository/core/user.repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [MyUserProfileService, UserRepository],
  controllers: [MyUserProfileController],
})
export class MyUserProfileModule {}
