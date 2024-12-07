import NodeCache from 'node-cache';
import { injectable } from 'inversify';

@injectable()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 60 }); // Default TTL: 60 seconds
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, ttl ?? 60);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  delete(key: string): void {
    this.cache.del(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}
