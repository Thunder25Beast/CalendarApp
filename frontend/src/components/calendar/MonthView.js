// src/components/calendar/MonthView.js
import React from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { formatTime } from "../../lib/calendar-utils";

export default function MonthView({ weeks, onDayClick, onEventClick, isLoading, onCreateEvent  }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const categoryColorMap = {
    ERC: "bg-blue-500",
    TL: "bg-red-500",
    AERO: "bg-purple-500",
    CHEMETL: "bg-emerald-500",
    other: "bg-amber-500"
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-3 text-center text-sm font-medium text-slate-700">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 flex-1 h-[calc(100%-3rem)]">
          {Array.from({ length: 42 }).map((_, i) => (
            <div key={i} className="border-b border-r border-slate-200 min-h-[100px] p-1">
              <Skeleton className="h-6 w-6 rounded-full mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-3 text-center text-sm font-medium text-slate-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 flex-1 h-[calc(100%-3rem)]">
        {weeks.flat().map((day, index) => (
          <div 
            key={index}
            className={`border-b border-r border-slate-200 min-h-[100px] p-1 relative group
                        ${!day.isCurrentMonth ? 'bg-slate-50 text-slate-400' : ''}`}
            onClick={() => onDayClick(day.date)}
          >
            <div className="flex justify-between items-start p-1">
              <span 
                className={`text-sm font-medium ${day.isToday ? 
                  'bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}
              >
                {format(day.date, "d")}
              </span>
              {/* For debugging, the Plus icon is always visible by ensuring opacity is set to 100 and a contrasting text color */}
              <Button
                variant="ghost"
                size="icon"
                className="text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateEvent(day.date);
                }}
              >
                <Plus className="h-3 w-3 text-black" />
              </Button> 
            </div>
            <div className="space-y-1">
              {day.events.slice(0, 3).map((event) => (
                <button
                  key={event.id}
                  className={`px-1 py-0.5 text-xs rounded ${categoryColorMap[event.category]} text-white truncate mb-1 w-full text-left`}
                  title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  {formatTime(event.startTime)} - {event.title}
                </button>
              ))}
              {day.events.length > 3 && (
                <div className="text-xs text-slate-500 px-1">
                  +{day.events.length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
