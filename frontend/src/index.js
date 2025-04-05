// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this line is present
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
