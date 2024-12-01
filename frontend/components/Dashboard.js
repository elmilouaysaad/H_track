import { useState, useEffect } from "react";
import { fetchInventory } from "../utils/api";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const data = await fetchInventory();
      setInventory(data);
    };
    getInventory();
  }, []);

  return (
    <div>
      <h2>Real-Time Hydrogen Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.stationId}>
            {item.stationId}: {item.hydrogenLevel.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
