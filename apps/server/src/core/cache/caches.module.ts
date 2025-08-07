import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { Global, Module } from "@nestjs/common";

/**
 * CachesModule is a global module that provides caching services.
 *
 * Note: This module is marked as global, meaning its providers will be available throughout the application without needing to import it in other modules.
 * This is necessary if you want to ensure that only a single instance of the cache services is used across the application.
 */
@Global()
@Module({
  providers: [UserCacheService, UserAuthInfoCacheService],
  exports: [UserCacheService, UserAuthInfoCacheService],
})
export class CachesModule {}
