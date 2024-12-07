const TYPES = {
  //Utils
  Logger: Symbol.for('Logger'),
  SQLiteConnection: Symbol.for('SQLiteConnection'),

  // Controllers
  LinkController: Symbol.for('LinkController'),

  // Services
  LinkService: Symbol.for('LinkService'),
  NanoidService: Symbol.for('NanoidService'),
  CacheService: Symbol.for('CacheService'),

  // Repositories
  LinkRepository: Symbol.for('LinkRepository'),
};

export default TYPES;

export type ShortLink = {
  id: number;
  shortCode: string;
  originalUrl: string;
  expiresAt: number | null;
};
