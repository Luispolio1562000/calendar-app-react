import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños de Luis",
  notes: "Llevar regalo",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#fafafa",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeElement: null,
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
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event
      );
    },
    startDeleteEvent: (state) => {
      if (state.activeElement) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeElement._id
        );
        state.activeElement = null;
      }
    },
  },
});

export const {
  onSetActiveEvent,
  onClearActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  startDeleteEvent,
} = calendarSlice.actions;
