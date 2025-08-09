import { RoleModule } from "@core/auth/role/role.module";
import { UserModule } from "@core/auth/user/user.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [UserModule, RoleModule],
})
export class CoreModule {}
