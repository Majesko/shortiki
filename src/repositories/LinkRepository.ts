import { inject, injectable } from 'inversify';
import TYPES, { ShortLink } from '../types';
import { BaseRepository } from './BaseRepository';
import { SQLiteConnection } from '../database/SQLiteConnection';
import { convertKeysToCamelCase } from '../utlis/objectConverter';

const INSERT_SQL = `
  INSERT INTO short_links (short_code, original_url, expires_at) 
  VALUES (?, ?, ?);
`;

const SELECT_SQL = `
  SELECT * FROM short_links WHERE short_code = ?;
`;

const SELECT_MANY_SQL = `SELECT * FROM short_links LIMIT ? OFFSET ?`;

@injectable()
export class LinkRepository extends BaseRepository {
  constructor(@inject(TYPES.SQLiteConnection) connection: SQLiteConnection) {
    super(connection.getDatabase());
  }

  async createLink(newLink: Omit<ShortLink, 'id'>): Promise<ShortLink> {
    return await new Promise<ShortLink>((resolve, reject) => {
      this.db.run(
        INSERT_SQL,
        [newLink.shortCode, newLink.originalUrl, newLink.expiresAt],
        function (err) {
          if (err) {
            reject(err.message);
          } else {
            resolve({ id: this.lastID, ...newLink });
          }
        },
      );
    });
  }

  getLinkByShortCode(shortCode: string): Promise<ShortLink> {
    return new Promise<ShortLink>((resolve, reject) => {
      this.db.get(SELECT_SQL, [shortCode], function (err: Error | null, row: ShortLink) {
        if (err) {
          reject(err.message);
        } else {
          resolve(convertKeysToCamelCase(row));
        }
      });
    });
  }

  getLinks(limit: number = 10, offset: number = 0): Promise<ShortLink[]> {
    return new Promise<ShortLink[]>((resolve, reject) => {
      this.db.all(
        SELECT_MANY_SQL,
        [limit, offset],
        function (err: Error | null, rows: ShortLink[]) {
          if (err) {
            reject(err.message);
          } else {
            resolve(convertKeysToCamelCase(rows));
          }
        },
      );
    });
  }
}
