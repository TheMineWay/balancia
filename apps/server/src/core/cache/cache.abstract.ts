import type { Cacheable } from "cacheable";

export abstract class CacheService {
  constructor(protected readonly cache: Cacheable) {}

  async get<T>(
    key: string,
    fallback: () => Promise<T | null>,
  ): Promise<T | null> {
    const data = await this.cache.get<T>(key);
    if (data) return data;

    const fallbackData = await fallback();
    if (fallbackData) {
      await this.cache.set(key, fallbackData);
      return fallbackData;
    }
    return null;
  }
}
