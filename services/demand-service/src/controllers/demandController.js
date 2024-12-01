const db = require("../models/demandModel");
const { trainRegressionModel } = require("../utils/regressionModel");

/**
 * Get demand prediction for a given station and date.
 * @param {Request} req
 * @param {Response} res
 */
exports.getDemandForecast = (req, res) => {
  const { stationId, date } = req.body;

  db.all(
    "SELECT date, demand FROM demand WHERE stationId = ? ORDER BY date ASC",
    [stationId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Error retrieving historical demand data." });
      }

      if (rows.length === 0) {
        // If no historical data is available, simulate demand
        const simulatedDemand = Math.random() * 100;
        return res.json({ stationId, date, predictedDemand: simulatedDemand });
      }

      // Train the regression model
      const regressionPredictor = trainRegressionModel(rows);

      // Predict demand for the given date
      const predictedDemand = regressionPredictor(date);
      res.json({ stationId, date, predictedDemand });
    }
  );
};

/**
 * Add historical demand data for training.
 * @param {Request} req
 * @param {Response} res
 */
exports.addDemandData = (req, res) => {
  const { stationId, date, demand } = req.body;

  db.run(
    "INSERT INTO demand (stationId, date, demand) VALUES (?, ?, ?)",
    [stationId, date, demand],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error adding demand data." });
      }
      res.json({ message: "Demand data added successfully." });
    }
  );
};
