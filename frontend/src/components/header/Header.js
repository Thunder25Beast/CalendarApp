// src/components/header/Header.js
import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function Header({ onCreateEvent, onSearchChange }) {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-800 text-white">
      <h1 className="text-xl font-bold">Calendar App</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search events..." 
            className="p-2 pl-10 rounded bg-gray-100 text-gray-700 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>
        <Button onClick={onCreateEvent}>Create Event</Button>
      </div>
    </header>
  );
}
