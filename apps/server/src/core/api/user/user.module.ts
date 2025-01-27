import { MyUserProfileModule } from "@core/api/user/profile/my-user-profile.module";
import { UserRepository } from "@database/repository/core/user.repository";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  imports: [MyUserProfileModule],
})
export class UserModule {}
