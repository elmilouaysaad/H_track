const express = require("express");
const { getDemandForecast, addDemandData } = require("../controllers/demandController");

const router = express.Router();

router.post("/forecast", getDemandForecast);
router.post("/add", addDemandData);

module.exports = router;
