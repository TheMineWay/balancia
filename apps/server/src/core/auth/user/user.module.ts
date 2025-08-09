import { AdminUserController } from "@core/auth/user/admin-user.controller";
import { UserRepository } from "@core/auth/user/repository/user.repository";
import { UserController } from "@core/auth/user/user.controller";
import { UserService } from "@core/auth/user/user.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
	providers: [UserService, UserRepository],
	exports: [UserService],
	controllers: [UserController, AdminUserController],
})
export class UserModule {}
