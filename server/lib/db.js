import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

function ensureUsersHeartsColumn(db) {
  const columns = db.prepare("PRAGMA table_info(users)").all();
  const hasHeartsColumn = columns.some((column) => column.name === "hearts");
  const hasPhotoUrlColumn = columns.some((column) => column.name === "photo_url");

  if (!hasHeartsColumn) {
    db.exec("ALTER TABLE users ADD COLUMN hearts INTEGER NOT NULL DEFAULT 0");
  }

  if (!hasPhotoUrlColumn) {
    db.exec("ALTER TABLE users ADD COLUMN photo_url TEXT");
  }

  const hasWalletsTable = db
    .prepare(
      `
        SELECT name
        FROM sqlite_master
        WHERE type = 'table' AND name = 'wallets'
      `
    )
    .get();

  if (hasWalletsTable) {
    db.exec(`
      UPDATE users
      SET hearts = COALESCE(
        (SELECT wallets.hearts FROM wallets WHERE wallets.user_id = users.id),
        hearts,
        0
      )
    `);
  } else {
    db.exec("UPDATE users SET hearts = COALESCE(hearts, 0)");
  }
}

export function initDb(config) {
  const dbDir = path.dirname(config.databasePath);
  const schemaPath = path.resolve(config.rootDir, "server/db/schema.sql");

  fs.mkdirSync(dbDir, { recursive: true });

  const db = new Database(config.databasePath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(fs.readFileSync(schemaPath, "utf8"));
  ensureUsersHeartsColumn(db);

  return db;
}
