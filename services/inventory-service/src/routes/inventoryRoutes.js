const express = require("express");
const router = express.Router();
const {
  getAllInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

// Route to get all inventory data
router.get("/", getAllInventory);

// Route to update or add inventory data
router.post("/", updateInventory);

// Route to delete inventory by station ID
router.delete("/:stationId", deleteInventory);

module.exports = router;
