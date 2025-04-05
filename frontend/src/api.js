// src/api.js
import axios from "axios";

// Create an Axios instance with the Django API base URL
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // adjust if your Django backend runs on another port or domain
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch events
export const fetchEvents = () => apiClient.get("/events/");

// Function to create a new event
export const createEvent = (eventData) => apiClient.post("/events/", eventData);

export default apiClient;
