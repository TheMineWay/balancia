import { UserController } from "@core/api/user/user.controller";
import { UserService } from "@core/api/user/user.service";
import { UserRepository } from "@database/repository/core/user.repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
