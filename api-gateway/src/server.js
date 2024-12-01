const express = require("express");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
app.use(express.json());

// Use API routes
app.use("/", apiRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
