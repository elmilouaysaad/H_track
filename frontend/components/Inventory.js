import { useState, useEffect } from "react";
import { fetchInventory, updateInventory, deleteInventory } from "../utils/api";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [newInventory, setNewInventory] = useState({
    stationId: "",
    hydrogenLevel: "",
  });

  // Fetch inventory data from the API
  useEffect(() => {
    const getInventory = async () => {
      const data = await fetchInventory();
      setInventory(data);
    };
    getInventory();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewInventory({
      ...newInventory,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding or updating inventory
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stationId, hydrogenLevel } = newInventory;
    if (stationId && hydrogenLevel) {
      await updateInventory(stationId, hydrogenLevel);
      const updatedInventory = await fetchInventory();
      setInventory(updatedInventory);
      setNewInventory({ stationId: "", hydrogenLevel: "" }); // Reset form
    }
  };

  // Handle deleting inventory
  const handleDelete = async (stationId) => {
    await deleteInventory(stationId);
    const updatedInventory = await fetchInventory();
    setInventory(updatedInventory);
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      {/* Form for adding or updating inventory */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="stationId"
          value={newInventory.stationId}
          placeholder="Station ID"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="hydrogenLevel"
          value={newInventory.hydrogenLevel}
          placeholder="Hydrogen Level"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add/Update Inventory</button>
      </form>

      <h3>Current Inventory</h3>
      <ul>
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <li key={item.stationId}>
              {item.stationId}: {item.hydrogenLevel.toFixed(2)}%{" "}
              <button onClick={() => handleDelete(item.stationId)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No inventory data available.</li>
        )}
      </ul>
    </div>
  );
};

export default Inventory;
