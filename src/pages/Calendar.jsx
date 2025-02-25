import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ButtonGroup from "../ui/ButtonGroup";

// Styled Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

function CalendarComponent() {
  const [events, setEvents] = useState([
    { id: "1", title: "Meeting", start: "2025-02-17T10:30:00" },
    { id: "2", title: "Lunch", start: "2025-02-17T12:00:00" },
    { id: "3", title: "Conference", start: "2025-02-16" },
    { id: "4", title: "Birthday Party", start: "2025-02-17T07:00:00" },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", time: "", date: "" });

  // Handle date click to open modal
  const handleDateClick = (info) => {
    setNewEvent({ title: "", time: "", date: info.dateStr });
    setIsModalOpen(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Add new event to state
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    const eventDateTime = `${newEvent.date}T${newEvent.time}:00`;

    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        title: newEvent.title,
        start: eventDateTime,
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        displayEventTime={true}
        displayEventEnd={true}
      />

      {/* Modal for Adding Event */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add Event</h3>

            <Input
              type="text"
              name="title"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={handleChange}
            />
            <Input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleChange}
            />
            <ButtonGroup>
              <Button
                $variation="primary"
                $size="medium"
                onClick={handleAddEvent}
              >
                Add Event
              </Button>
              <Button
                $variation="secondary"
                $size="medium"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default CalendarComponent;
