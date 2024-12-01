import { useState } from "react";
import { fetchDemandForecast } from "../utils/api";

const DemandForecast = () => {
  const [stationId, setStationId] = useState("");
  const [date, setDate] = useState("");
  const [forecast, setForecast] = useState(null);

  const handleSubmit = async () => {
    const response = await fetchDemandForecast(stationId, date);
    setForecast(response);
  };

  return (
    <div>
      <h3>Demand Forecast</h3>
      <input
        type="text"
        placeholder="Station ID"
        value={stationId}
        onChange={(e) => setStationId(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Get Forecast</button>
      {forecast && (
        <div>
          <h4>Predicted Demand: {forecast.predictedDemand.toFixed(2)}%</h4>
        </div>
      )}
    </div>
  );
};

export default DemandForecast;
