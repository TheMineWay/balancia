import { UserCacheService } from "@core/api/user/user-cache.service";
import { Global, Module } from "@nestjs/common";
/* Module */

@Global()
@Module({
  providers: [UserCacheService],
  exports: [UserCacheService],
})
export class CachesModule {}
