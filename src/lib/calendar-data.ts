/**
 * ADMIN INSTRUCTIONS:
 * 1. To add a new event, copy an existing event block (between { and }).
 * 2. Change the 'id' to a unique number.
 * 3. Set 'title', 'date' (YYYY-MM-DD), 'category' (Exam, Holiday, Event, Activity), and 'description'.
 * 4. Save this file to update the website calendar automatically.
 */
export type EventCategory = "Exam" | "Holiday" | "Event" | "Activity" | "Exams" | "Holidays" | "Events" | "Activities";

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  category: EventCategory;
  description: string;
}

export const SCHOOL_EVENTS: SchoolEvent[] = [];
