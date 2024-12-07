import { Router } from 'express';
import linkRouter from './linkRoutes';
import container from '../container';
import { LinkController } from '../controllers/LinkController';
import TYPES from '../types';

const rootRouter = Router();
const linkController = container.get<LinkController>(TYPES.LinkController);

rootRouter.get('/:shortCode', (req, res) => linkController.followLink(req, res));
rootRouter.use('/api/links', linkRouter);

export default rootRouter;
