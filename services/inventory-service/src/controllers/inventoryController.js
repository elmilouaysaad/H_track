const db = require("../models/inventoryModel");

// Get all inventory data
exports.getAllInventory = (req, res) => {
  db.all("SELECT * FROM inventory", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving inventory data." });
    } else {
      res.json(rows);
    }
  });
};

// Update inventory for a station
exports.updateInventory = (req, res) => {
  const { stationId, hydrogenLevel } = req.body;
  const lastUpdated = new Date().toISOString();

  db.run(
    `
      INSERT INTO inventory (stationId, hydrogenLevel, lastUpdated)
      VALUES (?, ?, ?)
      ON CONFLICT(stationId) DO UPDATE SET
        hydrogenLevel=excluded.hydrogenLevel,
        lastUpdated=excluded.lastUpdated
    `,
    [stationId, hydrogenLevel, lastUpdated],
    function (err) {
      if (err) {
        res.status(500).json({ error: "Error updating inventory." });
      } else {
        res.json({ message: "Inventory updated successfully." });
      }
    }
  );
};

// Delete inventory for a station
exports.deleteInventory = (req, res) => {
  const { stationId } = req.params;
  db.run("DELETE FROM inventory WHERE stationId = ?", [stationId], function (err) {
    if (err) {
      res.status(500).json({ error: "Error deleting inventory record." });
    } else {
      res.json({ message: "Inventory record deleted successfully." });
    }
  });
};
