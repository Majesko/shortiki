import { inject, injectable } from 'inversify';
import sqlite, { Database } from 'sqlite3';
import TYPES from '../types';
import { Logger } from 'pino';

@injectable()
export class SQLiteConnection {
  private readonly db: Database;

  constructor(@inject(TYPES.Logger) private logger: Logger) {
    this.db = new sqlite.Database('./database.sqlite', (err) => {
      if (err) {
        logger.error('Error in sqlite database connection', err);
      } else {
        logger.info('Connected to sqlite database');
      }
    });
  }

  getDatabase(): Database {
    return this.db;
  }

  closeConnection(): void {
    this.db.close((err) => {
      if (err) {
        this.logger.error('Error in sqlite database connection', err);
      } else {
        this.logger.info('Connection to sqlite closed');
      }
    });
  }
}
