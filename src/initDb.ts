// eslint-disable-next-line @typescript-eslint/no-require-imports
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

const createTableSQL = `
CREATE TABLE short_links (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    short_code VARCHAR(16) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    clicks INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);
`;

db.serialize(() => {
  db.run(createTableSQL);
});

db.close();
