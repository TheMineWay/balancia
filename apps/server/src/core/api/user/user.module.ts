import { UserController } from "@core/api/user/user.controller";
import { UserService } from "@core/api/user/user.service";
import { UserRepository } from "@database/repository/core/user.repository";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
