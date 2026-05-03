"use client";

import React, { useState, useMemo } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  parseISO
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { SCHOOL_EVENTS, type SchoolEvent, type EventCategory } from "@/lib/calendar-data";
import { fetchDataFromSheet } from "@/lib/sheets";

const CALENDAR_SHEET_ID = "1yq3iz43AgYISZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs";
const CALENDAR_SHEET_URL = `https://docs.google.com/spreadsheets/d/${CALENDAR_SHEET_ID}/export?format=csv&gid=1328060838`;

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Exam: "#EF4444", 
  Holiday: "#F5A623",
  Event: "#0A2463",
  Activity: "#0DB6B5",
};

const DynamicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [events, setEvents] = useState<SchoolEvent[]>([]);

  React.useEffect(() => {
    async function loadEvents() {
      const data = await fetchDataFromSheet<SchoolEvent>(CALENDAR_SHEET_URL, '0', (cols) => ({
        id: cols[0],
        title: cols[1],
        date: cols[2], // Expecting YYYY-MM-DD
        category: cols[3] as EventCategory,
        description: cols[4]
      }));
      if (data && data.length > 0) {
        setEvents(data);
      }
    }
    loadEvents();
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      try {
        return isSameDay(parseISO(event.date), day);
      } catch {
        return false;
      }
    });
  };

  return (
    <div className="dynamic-calendar-wrapper" style={{ width: '100%' }}>
      {/* Header Controls */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          backgroundColor: 'white', 
          border: '3px solid #000', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px', 
          boxShadow: '6px 6px 0 #000' 
        }}>
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex' }}>
            <ChevronLeft size={24} />
          </button>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.25rem', 
            fontWeight: 900, 
            color: '#0A2463', 
            minWidth: '160px', 
            textAlign: 'center', 
            textTransform: 'uppercase', 
            letterSpacing: '-0.02em' 
          }}>
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex' }}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {(Object.keys(CATEGORY_COLORS) as EventCategory[]).map(cat => (
            <div key={cat} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '99px', 
              backgroundColor: 'white', 
              border: '2px solid #eee', 
              fontSize: '0.65rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em' 
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: CATEGORY_COLORS[cat] }} />
              {cat === 'Activity' ? 'Activities' : `${cat}s`}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Container */}
      <div style={{ 
        backgroundColor: 'white', 
        border: '3px solid #000', 
        borderRadius: '30px', 
        overflow: 'hidden', 
        boxShadow: '12px 12px 0 rgba(0,0,0,0.05)' 
      }}>
        {/* Weekday Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          backgroundColor: '#0A2463', 
          color: 'white' 
        }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} style={{ 
              padding: '1rem 0', 
              textAlign: 'center', 
              fontSize: '0.65rem', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              borderRight: '1px solid rgba(255,255,255,0.1)' 
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          width: '100%'
        }}>
          {days.map((day, idx) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div 
                key={idx}
                style={{ 
                  minHeight: '80px', 
                  padding: '0.75rem', 
                  borderRight: '1px solid #eee', 
                  borderBottom: '1px solid #eee', 
                  position: 'relative',
                  backgroundColor: !isCurrentMonth ? '#f9f9f9' : 'white'
                }}
              >
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 900, 
                  color: !isCurrentMonth ? '#ccc' : '#0A2463' 
                }}>
                  {format(day, "d")}
                </span>

                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      style={{ 
                        cursor: 'pointer', 
                        padding: '0.4rem', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        backgroundColor: `${CATEGORY_COLORS[event.category]}15` 
                      }}
                    >
                      <p style={{ 
                        fontSize: '0.6rem', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        lineHeight: 1.2, 
                        margin: 0,
                        color: CATEGORY_COLORS[event.category],
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {event.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 2000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: 'rgba(10, 36, 99, 0.9)', 
              backdropFilter: 'blur(8px)', 
              padding: '1.5rem' 
            }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ 
                backgroundColor: 'white', 
                width: '100%', 
                maxWidth: '450px', 
                borderRadius: '40px', 
                padding: '2.5rem', 
                position: 'relative', 
                border: '4px solid #000', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)' 
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  right: '1.5rem', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#999' 
                }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  backgroundColor: CATEGORY_COLORS[selectedEvent.category] 
                }}>
                  <CalendarIcon size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>
                    {selectedEvent.category}
                  </span>
                  <p style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0A2463', margin: '0.25rem 0 0' }}>
                    {format(parseISO(selectedEvent.date), "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0A2463', marginBottom: '1rem', lineHeight: 1.2 }}>
                {selectedEvent.title}
              </h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {selectedEvent.description}
              </p>

              <button
                onClick={() => setSelectedEvent(null)}
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  borderRadius: '18px', 
                  backgroundColor: '#0A2463', 
                  color: 'white', 
                  fontWeight: 900, 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em', 
                  border: 'none', 
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(10, 36, 99, 0.2)'
                }}
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicCalendar;
