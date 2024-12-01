import { useState } from "react";
import { fetchOptimalRoute } from "../utils/api";

const RouteOptimization = () => {
  const [start, setStart] = useState("");
  const [destinations, setDestinations] = useState("");
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  const handleSubmit = async () => {
    const destinationList = destinations.split(",").map((s) => s.trim());
    const response = await fetchOptimalRoute(start, destinationList);
    setOptimizedRoute(response);
  };

  return (
    <div>
      <h3>Find the Optimal Route</h3>
      <input
        type="text"
        placeholder="Start Location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destinations (comma-separated)"
        value={destinations}
        onChange={(e) => setDestinations(e.target.value)}
      />
      <button onClick={handleSubmit}>Optimize</button>
      {optimizedRoute.length > 0 && (
        <div>
          <h4>Optimized Route:</h4>
          <ul>
            {optimizedRoute.map((station, index) => (
              <li key={index}>{station}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RouteOptimization;
