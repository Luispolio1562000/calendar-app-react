import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños de Luis",
//   notes: "Llevar regalo",
//   start: new Date(),
//   end: addHours(new Date(), 1),
//   bgColor: "#fafafa",
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeElement: null,
    isLoadingEvents: true,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeElement = payload;
    },
    onClearActiveEvent: (state) => {
      state.activeElement = null;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeElement = null;
    },
    onSetEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event
      );
    },
    startDeleteEvent: (state) => {
      if (state.activeElement) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeElement.id
        );
        state.activeElement = null;
      }
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeElement = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onClearActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onSetEvents,
  startDeleteEvent,
  onLogoutCalendar,
} = calendarSlice.actions;
