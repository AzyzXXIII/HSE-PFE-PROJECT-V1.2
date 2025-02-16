import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import ExternalEvents from "../features/calendar/ExternalEvents";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Meeting",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Workout",
      start: new Date().toISOString().split("T")[0],
    },
  ]);

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <>
      {/*       <ExternalEvents />
       */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
        events={events}
        eventDrop={handleEventDrop}
        eventOverlap={false}
      />
    </>
  );
};

export default Calendar;
