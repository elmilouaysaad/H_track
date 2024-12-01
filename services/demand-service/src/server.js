const express = require("express");
const demandRoutes = require("./routes/demandRoutes");

const app = express();
app.use(express.json());

// Use the demand routes
app.use("/api/demand", demandRoutes);

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Demand Forecasting Service running on port ${PORT}`));
