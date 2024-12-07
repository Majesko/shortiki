import { Database } from 'sqlite3';

export abstract class BaseRepository {
  protected readonly db: Database;

  protected constructor(db: Database) {
    this.db = db;
  }
}
