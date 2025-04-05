// src/components/calendar/CalendarControls.js
import React from "react";
import { Button } from "../ui/button";

export default function CalendarControls({ currentMonthYear, onPrevMonth, onNextMonth, onToday }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" onClick={onPrevMonth}>Previous</Button>
      <h2 className="text-lg font-bold">{currentMonthYear}</h2>
      <Button variant="outline" onClick={onNextMonth}>Next</Button>
      <Button variant="outline" onClick={onToday}>Today</Button>
    </div>
  );
}
