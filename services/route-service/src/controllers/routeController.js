const db = require("../models/stationModel");

// Helper: Calculate straight-line (heuristic) distance
const calculateHeuristic = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// A* Algorithm
const aStar = (startStation, goalStation, allStations) => {
  const openSet = [startStation];
  const cameFrom = {};

  const gScore = {};
  const fScore = {};

  // Initialize scores
  Object.keys(allStations).forEach((station) => {
    gScore[station] = Infinity;
    fScore[station] = Infinity;
  });

  gScore[startStation] = 0;
  fScore[startStation] = calculateHeuristic(
    allStations[startStation].latitude,
    allStations[startStation].longitude,
    allStations[goalStation].latitude,
    allStations[goalStation].longitude
  );

  while (openSet.length > 0) {
    // Find station with the lowest fScore
    const current = openSet.reduce((a, b) => (fScore[a] < fScore[b] ? a : b));

    if (current === goalStation) {
      // Path found, reconstruct path
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift(temp);
        temp = cameFrom[temp];
      }
      return path;
    }

    // Remove current station from openSet
    openSet.splice(openSet.indexOf(current), 1);

    // Explore neighbors
    const neighbors = JSON.parse(allStations[current].neighbors);
    for (const neighbor in neighbors) {
      const tentativeGScore = gScore[current] + neighbors[neighbor];

      if (tentativeGScore < gScore[neighbor]) {
        // Update scores
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] =
          tentativeGScore +
          calculateHeuristic(
            allStations[neighbor].latitude,
            allStations[neighbor].longitude,
            allStations[goalStation].latitude,
            allStations[goalStation].longitude
          );

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  throw new Error("Route not found");
};

// API: Get optimal route using A*
exports.getOptimalRoute = (req, res) => {
  const { start, goal } = req.body;

  db.all("SELECT * FROM stations", [], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(500).json({ error: "Error retrieving stations." });
    }

    const allStations = {};
    rows.forEach((station) => {
      allStations[station.stationId] = {
        latitude: station.latitude,
        longitude: station.longitude,
        neighbors: station.neighbors,
      };
    });

    if (!allStations[start] || !allStations[goal]) {
      return res.status(404).json({ error: "Start or goal station not found." });
    }

    try {
      const path = aStar(start, goal, allStations);
      res.json({ path });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
