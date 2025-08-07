import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { Global, Module } from "@nestjs/common";
/* Module */

@Global()
@Module({
  providers: [UserCacheService, UserAuthInfoCacheService],
  exports: [UserCacheService, UserAuthInfoCacheService],
})
export class CachesModule {}
