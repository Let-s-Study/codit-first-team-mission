import axios from "axios";

const baseURL =
  import.meta && import.meta.env && import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:4000/api";

console.log("[api] baseURL =", baseURL);

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
