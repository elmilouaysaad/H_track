const axios = require("axios");

// Proxy function to route requests to respective services
const routeToService = async (req, res, serviceUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.url}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in proxying request:", error);
    res.status(500).json({ error: "Error communicating with service." });
  }
};

module.exports = {
  routeToService,
};
