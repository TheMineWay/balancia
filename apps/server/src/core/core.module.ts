import { RoleModule } from "@core/api/role/role.module";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [UserModule, RoleModule],
})
export class CoreModule {}
