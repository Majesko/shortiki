import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger } from 'pino';
import TYPES from './types';
import { createLogger } from './logger';
import { LinkService } from './services/LinkService';
import { LinkController } from './controllers/LinkController';
import { SQLiteConnection } from './database/SQLiteConnection';
import { NanoidService } from './services/NanoidService';
import { LinkRepository } from './repositories/LinkRepository';
import { CacheService } from './services/CacheService';

const container = new Container();

// Utils
container.bind<Logger>(TYPES.Logger).toConstantValue(createLogger());
container.bind<SQLiteConnection>(TYPES.SQLiteConnection).to(SQLiteConnection);

// Services
container.bind<LinkService>(TYPES.LinkService).to(LinkService);
container.bind<NanoidService>(TYPES.NanoidService).to(NanoidService);
container.bind<CacheService>(TYPES.CacheService).to(CacheService);

// Controllers
container.bind<LinkController>(TYPES.LinkController).to(LinkController);

// Repositories
container.bind<LinkRepository>(TYPES.LinkRepository).to(LinkRepository);

export default container;
