import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables drag & drop
import styled from "styled-components";

function CalendarComponent() {
  const [events, setEvents] = useState([
    { id: "1", title: "Meeting", start: "2025-02-17T10:30:00" },
    { id: "2", title: "Lunch", start: "2025-02-17T12:00:00" },
    { id: "3", title: "Conference", start: "2025-02-16" },
    { id: "4", title: "Birthday Party", start: "2025-02-17T07:00:00" },
  ]);

  // Function to handle date click (to add a new event)
  const handleDateClick = (info) => {
    const title = prompt("Enter event title:");
    const time = prompt("Enter event time (HH:MM in 24h format):");
    if (title && time) {
      const eventDateTime = `${info.dateStr}T${time}:00`;
      setEvents([
        ...events,
        { id: Date.now().toString(), title, start: eventDateTime },
      ]);
    }
  };

  // Function to handle event drop (when dragging)
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      editable={true} // Enables drag & drop
      selectable={true} // Allows clicking to add events
      events={events} // Renders events from state
      dateClick={handleDateClick} // Click to add event
      eventDrop={handleEventDrop} // Drag & drop event handler
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short", // Shows AM/PM
      }}
      displayEventTime={true} // Ensures time is shown in month view
      displayEventEnd={true} // Shows end time if provided
    />
  );
}

export default CalendarComponent;
