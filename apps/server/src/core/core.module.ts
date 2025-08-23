import { RoleModule } from "@core/auth/role/role.module";
import { UserModule } from "@core/auth/user/user.module";
import { ServerInfoModule } from "@core/server/server-info.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [UserModule, RoleModule, ServerInfoModule],
})
export class CoreModule {}
