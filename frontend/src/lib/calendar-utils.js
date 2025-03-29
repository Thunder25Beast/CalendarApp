// src/lib/calendar-utils.js
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

// Format a date as YYYY-MM-DD (for API use or matching event dates)
export function formatDateForApi(date) {
  return format(date, "yyyy-MM-dd");
}

// Format time from 24h to 12h format
export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}

// Get calendar days for a given month and attach events
export function getCalendarDays(date, events) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const today = new Date();
  
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate days from previous month
  const firstDayOfMonth = monthStart.getDay();
  const prevMonthDays = [];
  if (firstDayOfMonth > 0) {
    const prevMonth = subMonths(monthStart, 1);
    const prevMonthEnd = endOfMonth(prevMonth);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(prevMonthEnd);
      day.setDate(prevMonthEnd.getDate() - i);
      prevMonthDays.push(day);
    }
  }
  
  // Calculate days from next month
  const lastDayOfMonth = monthEnd.getDay();
  const nextMonthDays = [];
  if (lastDayOfMonth < 6) {
    const nextMonth = addMonths(monthStart, 1);
    const nextMonthStart = startOfMonth(nextMonth);
    for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
      const day = new Date(nextMonthStart);
      day.setDate(nextMonthStart.getDate() + i - 1);
      nextMonthDays.push(day);
    }
  }
  
  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];
  
  return allDays.map(day => {
    const dateString = formatDateForApi(day);
    const dayEvents = events.filter(event => event.date === dateString);
    return {
      date: day,
      isCurrentMonth: isSameMonth(day, date),
      isToday: isSameDay(day, today),
      events: dayEvents,
    };
  });
}

// Group calendar days into weeks (arrays of 7 days)
export function getCalendarWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
