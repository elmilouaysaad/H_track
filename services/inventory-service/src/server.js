const express = require("express");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
app.use(express.json());

// Use the inventory routes
app.use("/api/inventory", inventoryRoutes);

// Set the server to listen on the given port
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Inventory Service is running on port ${PORT}`);
});
