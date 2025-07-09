import { ENV } from "@constants/conf/env.constant";
import { Global, Module, Provider } from "@nestjs/common";
import { Cacheable } from "cacheable";

/* Caches */

export const CACHE_PROVIDERS = {
  USER: "user",
  DATA: "data",
} satisfies Record<string, string>;

const USER_CACHE: Provider = {
  provide: CACHE_PROVIDERS.USER,
  useValue: new Cacheable({
    ttl: ENV.cache.user,
  }),
};

const DATA_CACHE: Provider = {
  provide: CACHE_PROVIDERS.DATA,
  useValue: new Cacheable({
    ttl: ENV.cache.data,
  }),
};

/* Module */

@Global()
@Module({
  providers: [USER_CACHE, DATA_CACHE],
  exports: [USER_CACHE, DATA_CACHE],
})
export class CachesModule {}
