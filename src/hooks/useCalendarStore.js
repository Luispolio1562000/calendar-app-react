import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onClearActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  startDeleteEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const { events, activeElement } = useSelector((state) => state.calendar);
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
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
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
    deleteEvent,
  };
};
