import React, { useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction";

const ExternalEvents = () => {
  useEffect(() => {
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".fc-event",
      eventData: (eventEl) => ({
        title: eventEl.innerText.trim(), // Use event text as title
      }),
    });
  }, []);

  return (
    <div id="external-events">
      <p>Drag an event to the calendar:</p>
      <div className="fc-event">Meeting</div>
      <div className="fc-event">Workshop</div>
      <div className="fc-event">Conference</div>
    </div>
  );
};

export default ExternalEvents;
