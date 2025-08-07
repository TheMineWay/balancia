import type { Cacheable } from "cacheable";

type GetOptions = {
  ttl?: number;
};

export abstract class CacheService {
  constructor(protected readonly cache: Cacheable) {}

  async get<T>(
    key: string,
    fallback: () => Promise<T | null>,
    { ttl }: GetOptions = {},
  ): Promise<T | null> {
    const data = await this.cache.get<T>(key);
    if (data) return data;

    const fallbackData = await fallback();
    if (fallbackData) {
      await this.cache.set(key, fallbackData, ttl);
      return fallbackData;
    }
    return null;
  }

  clearAll() {
    return this.cache.clear();
  }

  stats() {
    return this.cache.stats;
  }
}
