import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onClearActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  startDeleteEvent,
  onSetEvents,
} from "../store/calendar/calendarSlice";
import calendarApi from "../apis/calendarApi";
import { converteEventsDate } from "../helpers";
import Swal from "sweetalert2";

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
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/event/${calendarEvent.id}`, {
          ...calendarEvent,
        });
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("/events/new-event", {
        ...calendarEvent,
      });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }));
    } catch (error) {
      console.error("Error guardando o actualizando el evento:", error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events/all-events");
      const events = converteEventsDate(await data.events);
      dispatch(onSetEvents(events));
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
