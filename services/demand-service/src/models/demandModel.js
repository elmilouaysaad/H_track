const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "../../database.db"), (err) => {
  if (err) {
    console.error("Error opening demand database:", err);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS demand (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stationId TEXT NOT NULL,
        date TEXT NOT NULL,
        demand REAL NOT NULL
      )
    `);
    console.log("Demand table created or already exists.");
  }
});

module.exports = db;
