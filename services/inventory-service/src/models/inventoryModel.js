const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Open SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, "../../database.db"), (err) => {
  if (err) {
    console.error("Error opening inventory database:", err);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stationId TEXT UNIQUE NOT NULL,
        hydrogenLevel REAL NOT NULL,
        lastUpdated TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Error creating inventory table:", err);
      }
    });
  }
});

module.exports = db;
