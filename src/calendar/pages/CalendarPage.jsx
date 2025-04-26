import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  NavBar,
  FabDelete,
} from "../components";
import { useState } from "react";
import { getMessagesES, localizer } from "../../helpers";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks";

const evenlyStyleGetter = () => {
  const style = {
    backgroundColor: "#347CF7",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  };

  return {
    style,
  };
};

export const CalendarPage = () => {
  const { events, setActiveElement } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (event) => {
    console.log(event);

    setActiveElement(event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={lastView}
        defaultDate={new Date()}
        style={{ height: "calc(100vh - 90px)", padding: "1rem" }}
        messages={getMessagesES()}
        eventPropGetter={evenlyStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
