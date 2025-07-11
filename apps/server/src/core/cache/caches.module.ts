import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { Global, Module } from "@nestjs/common";
/* Module */

@Global()
@Module({
  providers: [UserCacheService],
  exports: [UserCacheService],
})
export class CachesModule {}
