import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  NavBar,
  FabDelete,
} from "../components";
import { useEffect, useState } from "react";
import { getMessagesES, localizer } from "../../helpers";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks";
import { useSelector } from "react-redux";

export const CalendarPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { events, setActiveElement, startLoadingEvents } = useCalendarStore();
  useEffect(() => {
    startLoadingEvents();
  }, []);

  const evenlyStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id;
    const style = {
      backgroundColor: isMyEvent ? "red" : "black",
      borderRadius: "0px",
      opacity: 0.7,
      color: "white",
      fontWeight: "lighter",
    };

    return {
      style,
    };
  };
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
