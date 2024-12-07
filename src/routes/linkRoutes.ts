import { Router } from 'express';
import container from '../container';
import TYPES from '../types';
import { LinkController } from '../controllers/LinkController';
import { validateRequest } from '../middlewares/validateRequest';
import { createShortLinkSchema } from '../validators/shortLinkValidator';

const linkRouter = Router();
const linkController = container.get<LinkController>(TYPES.LinkController);

linkRouter.get('/', (req, res) => linkController.getLinks(req, res));
linkRouter.post('/', validateRequest(createShortLinkSchema), (req, res) =>
  linkController.createLink(req, res),
);
linkRouter.get('/:shortCode', (req, res) => linkController.getLink(req, res));

export default linkRouter;
