import { UserProfileModule } from "@core/api/user/profile/user-profile.module";
import { UserRepository } from "@database/repository/core/user.repository";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  imports: [UserProfileModule],
})
export class UserModule {}
