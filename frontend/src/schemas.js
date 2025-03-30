// src/schemas.js
import { z } from "zod";

export const EVENT_CATEGORIES = ["ERC", "TL", "AERO", "CHEMETL", "other"];

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM format"),
  category: z.enum(EVENT_CATEGORIES),
  location: z.string().optional(),
  description: z.string().optional(),
});
