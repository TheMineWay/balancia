import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { Module } from "@nestjs/common";
/* Module */

@Module({
  providers: [UserCacheService],
  exports: [UserCacheService],
})
export class CachesModule {}
