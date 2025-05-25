import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ButtonGroup from "../ui/ButtonGroup";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../ui/Spinner";

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
  padding: 2.5rem 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  text-align: left;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  @keyframes fadeIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CalendarWrapper = styled.div`
  /* Simple event styling */
  .fc-event {
    border-radius: 4px !important;
    border: none !important;
    padding: 5px 6px !important;
    font-weight: 500 !important;
    font-size: 1.2rem !important;
    margin: 1px 0 !important;
  }

  /* Nice colors for events */
  .fc-event:nth-child(4n + 1) {
    background-color: #3b82f6 !important;
    color: white !important;
  }

  .fc-event:nth-child(4n + 2) {
    background-color: #10b981 !important;
    color: white !important;
  }

  .fc-event:nth-child(4n + 3) {
    background-color: #f59e0b !important;
    color: white !important;
  }

  .fc-event:nth-child(4n + 4) {
    background-color: #ef4444 !important;
    color: white !important;
  }
`;

// API functions
const fetchEvents = async () => {
  const res = await fetch("http://localhost:5000/api/calendar");
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  const data = await res.json();
  return data.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.start,
  }));
};

const createEvent = async (eventData) => {
  const res = await fetch("http://localhost:5000/api/calendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    throw new Error("Failed to add event");
  }

  return res.json();
};

const deleteEvent = async (eventId) => {
  const res = await fetch(`http://localhost:5000/api/calendar/${eventId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete event");
  }

  return res;
};

const updateEvent = async ({ id, data }) => {
  const res = await fetch(`http://localhost:5000/api/calendar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update event");
  }

  return res.json();
};

function CalendarComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", time: "", date: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const queryClient = useQueryClient();

  // Fetch events query
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    onError: (error) => {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    },
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsModalOpen(false);
      setNewEvent({ title: "", time: "", date: "" });
      toast.success("Event added successfully!");
    },
    onError: (error) => {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      toast.success("Event deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated!");
    },
    onError: (error) => {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    },
  });

  const handleDateClick = (info) => {
    setNewEvent({ title: "", time: "", date: info.dateStr });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) return;

    const start = `${newEvent.date}T${newEvent.time}:00`;
    createEventMutation.mutate({
      title: newEvent.title,
      start,
    });
  };

  const handleEventClick = (info) => {
    setEventToDelete(info.event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEventMutation.mutate(eventToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const handleEventDrop = (info) => {
    const { id, start } = info.event;

    updateEventMutation.mutate(
      {
        id,
        data: { start: start.toISOString() },
      },
      {
        onError: () => {
          info.revert();
        },
      }
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading calendar: {error.message}</div>;
  }

  return (
    <>
      <CalendarWrapper>
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
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          displayEventTime={true}
          displayEventEnd={true}
        />
      </CalendarWrapper>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Add Event Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add Event</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              Selected date: <strong>{newEvent.date}</strong>
            </p>
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
                disabled={createEventMutation.isPending}
              >
                <FaPlus style={{ marginRight: "6px" }} />
                {createEventMutation.isPending ? "Adding..." : "Add Event"}
              </Button>
              <Button
                $variation="secondary"
                $size="medium"
                onClick={() => setIsModalOpen(false)}
                disabled={createEventMutation.isPending}
              >
                <FaTimes style={{ marginRight: "6px" }} />
                Cancel
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Delete Event</h3>
            <p>Are you sure you want to delete this event?</p>
            <p>
              <strong>{eventToDelete?.title}</strong>
            </p>
            <ButtonGroup>
              <Button
                $variation="danger"
                $size="medium"
                onClick={handleConfirmDelete}
                disabled={deleteEventMutation.isPending}
              >
                <FaTrash style={{ marginRight: "6px" }} />
                {deleteEventMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
              <Button
                $variation="secondary"
                $size="medium"
                onClick={handleCancelDelete}
                disabled={deleteEventMutation.isPending}
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
