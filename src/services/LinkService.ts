import { injectable, inject } from 'inversify';
import { Logger } from 'pino';
import TYPES, { ShortLink } from '../types';
import { NanoidService } from './NanoidService';
import { LinkRepository } from '../repositories/LinkRepository';
import { CacheService } from './CacheService';

@injectable()
export class LinkService {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.LinkRepository) private readonly linkRepository: LinkRepository,
    @inject(TYPES.NanoidService) private readonly nanoidService: NanoidService,
    @inject(TYPES.CacheService) private readonly cacheService: CacheService,
  ) {}

  createLink(originalUrl: string, expiresAt: number | null): Promise<ShortLink> {
    const shortCode = this.nanoidService.generate();

    return this.linkRepository.createLink({ originalUrl, shortCode, expiresAt });
  }

  getLink(shortCode: string): Promise<ShortLink | null> {
    return this.linkRepository.getLinkByShortCode(shortCode);
  }

  getLinks(limit?: number, offset?: number): Promise<ShortLink[]> {
    return this.linkRepository.getLinks(limit, offset);
  }

  async getCachedLink(shortCode: string): Promise<string | null> {
    const cachedLink = this.cacheService.get<string>(shortCode);

    this.logger.info(`Cached link: ${cachedLink}`);

    if (!cachedLink) {
      const link = await this.linkRepository.getLinkByShortCode(shortCode);

      this.cacheService.set<string>(
        shortCode,
        link.originalUrl,
        Number(process.env.APP_LINK_CACHE_TTL) || 3600,
      );

      return link.originalUrl;
    }

    return Promise.resolve(cachedLink);
  }
}
