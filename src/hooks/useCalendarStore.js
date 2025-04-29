import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onClearActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  startDeleteEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../apis/calendarApi";

export const useCalendarStore = () => {
  const { events, activeElement } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const setActiveElement = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const onClearActiveEventInStore = () => {
    dispatch(onClearActiveEvent());
  };

  const deleteEvent = () => {
    dispatch(startDeleteEvent());
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      const { data } = await calendarApi.post("/events/new-event", {
        ...calendarEvent,
      });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }));
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events/all-events");
      console.log({ data });
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  };

  return {
    //? Properties..
    events,
    activeElement,
    hasEventSelected: !!activeElement,
    //? Methods.
    setActiveElement,
    onClearActiveEventInStore,
    startSavingEvent,
    startLoadingEvents,
    deleteEvent,
  };
};
