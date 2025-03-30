// src/App.js
import React, { useState } from "react";
import { addMonths, subMonths, format } from "date-fns";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
// import MobileNavigation from "./components/mobile-navigation/MobileNavigation";
import CalendarControls from "./components/calendar/CalendarControls";
import MonthView from "./components/calendar/MonthView";
import { getCalendarDays, getCalendarWeeks, formatDateForApi } from "./lib/calendar-utils";
import CreateEventModal from "./components/modals/CreateEventModal";

const initialEvents = [
  {
    id: 1,
    title: "Yoga Session",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 1))),
    startTime: "07:30",
    endTime: "08:00",
    category: "ERC",
    location: "Gym",
    description: "Morning yoga to energize your day"
  },
  {
    id: 2,
    title: "Yoga Session",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 1))),
    startTime: "07:00",
    endTime: "08:00",
    category: "ERC",
    location: "Gym",
    description: "Morning yoga to energize your day"
  },
  {
    id: 3,
    title: "Art Workshop",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 2))),
    startTime: "14:00",
    endTime: "16:00",
    category: "TL",
    location: "Art Studio",
    description: "Explore creative techniques and mediums"
  },
  {
    id: 4,
    title: "Science Seminar",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 3))),
    startTime: "11:00",
    endTime: "12:30",
    category: "AERO",
    location: "Auditorium",
    description: "Discuss recent scientific breakthroughs"
  },
  {
    id: 5,
    title: "Networking Lunch",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 4))),
    startTime: "12:00",
    endTime: "13:00",
    category: "other",
    location: "Cafeteria",
    description: "Meet industry professionals and expand your network"
  },
  {
    id: 6,
    title: "Coding Bootcamp",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 5))),
    startTime: "15:00",
    endTime: "18:00",
    category: "CHEMETL",
    location: "Lab",
    description: "Intensive coding session for beginners and pros alike"
  },
  {
    id: 7,
    title: "Soccer Practice",
    date: formatDateForApi(new Date(new Date().setDate(new Date().getDate() + 6))),
    startTime: "17:00",
    endTime: "19:00",
    category: "AERO",
    location: "Field",
    description: "Practice session for the weekend match"
  }
];

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState("month");
  const [events] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarDays = getCalendarDays(currentDate, events);
  const calendarWeeks = getCalendarWeeks(calendarDays);

  const goToPreviousMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
  const goToToday = () => setCurrentDate(new Date());
  const formattedMonthYear = format(currentDate, "MMMM yyyy");

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    console.log("Event clicked", event);
    setSelectedEvent(event);
  };

  const handleSubmitEvent = (newEvent) => {
    // For now, simply log the new event data.
    // You can integrate an API call or update the state here.
    console.log("New event created:", newEvent);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCreateEvent={handleCreateEvent} onSearchChange={(q) => console.log("Search", q)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          upcomingEvents={events} 
          onEventClick={handleEventClick} 
          selectedEvent={selectedEvent}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4">
          <CalendarControls
            currentMonthYear={formattedMonthYear}
            onPrevMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
          />
          {activeView === "month" && (
            <MonthView
              weeks={calendarWeeks}
              onDayClick={(date) => console.log("Day clicked", date)}
              onEventClick={handleEventClick}
              isLoading={false}
              onCreateEvent={handleCreateEvent}  // Pass the handler here

            />
          )}
          {/* Add other views (week, day, list) if needed */}
        </main>
      </div>
      
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmitEvent}
      />
    </div>
  );
}
