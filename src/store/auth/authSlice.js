import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'authenticated', 'not-authenticated', 'checking'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
