const API_BASE = "http://localhost:4004/api"; // Change this to the URL of the API Gateway in production

// Fetch inventory data from the API
export const fetchInventory = async () => {
  const response = await fetch(`${API_BASE}/inventory`);
  return await response.json();
};

// Update or add inventory data to the API
export const updateInventory = async (stationId, hydrogenLevel) => {
  const response = await fetch(`${API_BASE}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stationId, hydrogenLevel }),
  });
  return await response.json();
};

// Delete inventory data by station ID
export const deleteInventory = async (stationId) => {
  const response = await fetch(`${API_BASE}/inventory/${stationId}`, {
    method: "DELETE",
  });
  return await response.json();
};
