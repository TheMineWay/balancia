import { RoleModule } from "@core/auth/role/role.module";
import { UserModule } from "@core/auth/user/user.module";
import { HealthModule } from "@core/health/health.module";
import { ServerInfoModule } from "@core/server/server-info.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [UserModule, RoleModule, ServerInfoModule, HealthModule],
})
export class CoreModule {}
