// src/components/sidebar/Sidebar.js
import React from "react";
import { Button } from "../ui/button";
import { formatTime } from "../../lib/calendar-utils";

export default function Sidebar({ activeView, onViewChange, upcomingEvents, onEventClick, selectedEvent }) {
  return (
    <aside className="w-64 bg-slate-100 p-4 border-r border-slate-200">
      <nav className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">View</h2>
          <ul className="space-y-1">
            <li>
              <Button
                variant={activeView === "month" ? "default" : "ghost"}
                className={`w-full justify-start ${activeView === "month" ? "bg-primary-50 text-primary-700" : "text-slate-700"}`}
                onClick={() => onViewChange("month")}
              >
                Month
              </Button>
            </li>
            {/* Add additional view buttons if needed */}
          </ul>
        </div>
        
        {/* Display selected event details if one is clicked */}
        {selectedEvent && (
          <div className="mt-8 p-4 bg-white border border-slate-200 rounded">
            <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-slate-600 mb-1"><strong>Date:</strong> {selectedEvent.date}</p>
            <p className="text-sm text-slate-600 mb-1">
              <strong>Time:</strong> {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
            </p>
            <p className="text-sm text-slate-600 mb-1"><strong>Club:</strong> {selectedEvent.category}</p>
            <p className="text-sm text-slate-600 mb-1"><strong>Location:</strong> {selectedEvent.location}</p>

            <p className="text-sm text-slate-600"><strong>Description:</strong> {selectedEvent.description}</p>
          </div>
        )}
        
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Upcoming Events</h2>
          <ul className="space-y-2">
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <Button onClick={() => onEventClick(event)} variant="outline" className="w-full text-left">
                  {event.title} on {event.date}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
