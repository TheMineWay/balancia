import { AdminRoleController } from "@core/api/role/admin-role.controller";
import { RoleService } from "@core/api/role/role.service";
import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import { RoleRepository } from "@database/repository/core/role/role.repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [RoleRepository, RoleService, UserAuthInfoCacheService],
  exports: [RoleService],
  controllers: [AdminRoleController],
})
export class RoleModule {}
