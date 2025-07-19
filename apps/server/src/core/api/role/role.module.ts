import { AdminRoleController } from "@core/api/role/admin-role.controller";
import { RoleService } from "@core/api/role/role.service";
import { RoleRepository } from "@database/repository/core/role/role.repository";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AdminRoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
