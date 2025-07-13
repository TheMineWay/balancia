import { AdminRoleController } from "@core/api/role/admin-role.controller";
import { RoleController } from "@core/api/role/role.controller";
import { RoleService } from "@core/api/role/role.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RoleController, AdminRoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
