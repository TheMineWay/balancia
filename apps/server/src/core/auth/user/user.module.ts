import { AdminUserController } from "@core/auth/user/admin-user.controller";
import { UserController } from "@core/auth/user/user.controller";
import { UserService } from "@core/auth/user/user.service";
import { UserRepository } from "@database/repository/core/user.repository";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
	providers: [UserService, UserRepository],
	exports: [UserService],
	controllers: [UserController, AdminUserController],
})
export class UserModule {}
