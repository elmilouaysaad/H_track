const express = require("express");
const router = express.Router();
const { routeToService } = require("../controllers/proxyController");

// Define service URLs
const inventoryServiceUrl = "http://localhost:4005/";
const routeServiceUrl = "http://localhost:4001/";
const demandServiceUrl = "http://localhost:4002/";

// Proxy route for inventory
router.use("/api/inventory", (req, res) => routeToService(req, res, inventoryServiceUrl));

// Proxy route for route optimization
router.use("/api/routes", (req, res) => routeToService(req, res, routeServiceUrl));

// Proxy route for demand forecasting
router.use("/api/demand", (req, res) => routeToService(req, res, demandServiceUrl));

module.exports = router;
