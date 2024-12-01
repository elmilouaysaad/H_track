const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "../../database.db"), (err) => {
  if (err) {
    console.error("Error opening stations database:", err);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS stations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stationId TEXT UNIQUE NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        neighbors TEXT NOT NULL
      )
    `);
  }
});

module.exports = db;
