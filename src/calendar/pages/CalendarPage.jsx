import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, NavBar } from "../components";

import { addHours } from "date-fns";
import { getMessagesES, localizer } from "../../helpers";

const events = [
  {
    title: "Cumpleaños de Luis",
    notes: "Llevar regalo",
    start: new Date(),
    end: addHours(new Date(), 1),
  },
];

const evenlyStyleGetter = (event, start, end, isSelected) => {
  // console.log(event, start, end, isSelected);

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
  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: "calc(100vh - 90px)", padding: "1rem" }}
        messages={getMessagesES()}
        eventPropGetter={evenlyStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  );
};
