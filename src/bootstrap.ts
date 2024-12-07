import express from 'express';
import container from './container';
import TYPES from './types';
import { Logger } from 'pino';
import rootRouter from './routes';

const logger = container.get<Logger>(TYPES.Logger);

function registerMiddlewares(app: express.Application) {
  app.use(express.json());
}

function registerRoutes(app: express.Application) {
  app.use('/', rootRouter);
}

export default function bootstrap() {
  const app = express();
  const port = process.env.APP_PORT || 3000;

  registerMiddlewares(app);
  registerRoutes(app);

  app.listen(port, () => {
    logger.info('App is running on port', port);
  });
}
