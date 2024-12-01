const express = require("express");
const routeRoutes = require("./routes/routeRoutes");

const app = express();
app.use(express.json());
app.use("/api/routes", routeRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Route Optimization Service running on port ${PORT}`));
