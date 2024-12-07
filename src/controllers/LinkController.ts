import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Logger } from 'pino';
import TYPES from '../types';
import { LinkService } from '../services/LinkService';

@injectable()
export class LinkController {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.LinkService) private readonly linkService: LinkService,
  ) {}

  async followLink(req: Request, res: Response) {
    const { shortCode } = req.params;

    try {
      const shortLink = await this.linkService.getCachedLink(shortCode);

      if (shortLink) {
        res.redirect(shortLink);
      } else {
        res.status(404).send({ message: 'Path Not Found' });
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getLinks(req: Request, res: Response) {
    try {
      const shortLinks = await this.linkService.getLinks();

      res.json(shortLinks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getLink(req: Request, res: Response) {
    const { shortCode } = req.params;

    try {
      const shortLink = await this.linkService.getLink(shortCode);
      this.logger.info(shortLink);

      res.json(shortLink);
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }

  async createLink(req: Request, res: Response) {
    const { originalUrl } = req.body;

    try {
      const shortLink = await this.linkService.createLink(originalUrl, null);

      res.json(shortLink);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
}
