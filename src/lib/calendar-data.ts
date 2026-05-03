/**
 * ADMIN INSTRUCTIONS:
 * 1. To add a new event, copy an existing event block (between { and }).
 * 2. Change the 'id' to a unique number.
 * 3. Set 'title', 'date' (YYYY-MM-DD), 'category' (Exam, Holiday, Event, Activity), and 'description'.
 * 4. Save this file to update the website calendar automatically.
 */
export type EventCategory = "Exam" | "Holiday" | "Event" | "Activity";

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  category: EventCategory;
  description: string;
}

export const SCHOOL_EVENTS: SchoolEvent[] = [
  // JUNE 2026
  { id: "1", title: "School Reopens", date: "2026-06-02", category: "Event", description: "First day of the new academic session 2026-27." },
  { id: "2", title: "Orientation Week", date: "2026-06-05", category: "Activity", description: "Introduction to new curriculum and teachers." },
  
  // JULY 2026
  { id: "3", title: "Periodic Test 1", date: "2026-07-15", category: "Exam", description: "First round of formative assessments." },
  { id: "4", title: "Green Campus Day", date: "2026-07-22", category: "Activity", description: "Plantation drive and environmental awareness." },
  
  // AUGUST 2026
  { id: "5", title: "Independence Day", date: "2026-08-15", category: "Activity", description: "National celebration with cultural performances." },
  { id: "6", title: "Varalakshmi Vratham", date: "2026-08-25", category: "Holiday", description: "Regional Holiday." },
  
  // SEPTEMBER 2026
  { id: "7", title: "Teacher's Day", date: "2026-09-05", category: "Event", description: "Honoring our educators." },
  { id: "8", title: "Ganesh Chaturthi", date: "2026-09-07", category: "Holiday", description: "Festival Holiday." },
  { id: "9", title: "Mid-Term Exams", date: "2026-09-20", category: "Exam", description: "Half-yearly examinations for all grades." },
];
