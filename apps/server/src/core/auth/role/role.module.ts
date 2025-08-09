import { AdminRoleController } from "@core/auth/role/admin-role.controller";
import { RoleRepository } from "@core/auth/role/repositories/role.repository";
import { RoleService } from "@core/auth/role/role.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [RoleRepository, RoleService],
	exports: [RoleService],
	controllers: [AdminRoleController],
})
export class RoleModule {}
