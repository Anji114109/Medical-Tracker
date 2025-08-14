const BASE_URL = "http://localhost:5000/api";

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function fetchMedicines(userId) {
  const res = await fetch(`${BASE_URL}/medicines/${userId}`);
  return res.json();
}

export async function addMedicine(medicineData) {
  const res = await fetch(`${BASE_URL}/medicines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicineData),
  });
  return res.json();
}

export async function updateMedicine(id, medicineData) {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicineData),
  });
  return res.json();
}

export async function deleteMedicine(id) {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function addHistory(historyData) {
  const res = await fetch(`${BASE_URL}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(historyData),
  });
  return res.json();
}

export async function fetchHistory(userId, days = "7") {
  const res = await fetch(`${BASE_URL}/history/${userId}?days=${days}`);
  return res.json();
}
