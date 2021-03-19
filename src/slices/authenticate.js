/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    welcome: true,
    language: "",
    email: "",
    password: "",
  },
  reducers: {
    setWelcome: (state) => {
      state.welcome = !state.welcome;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  setLanguage,
  setEmail,
  setPassword,
  setWelcome,
} = authenticateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLanguage = (state) => state.authenticate.language;
export const selectEmail = (state) => state.authenticate.email;
export const selectPassword = (state) => state.authenticate.password;
export const selectWelcome = (state) => state.authenticate.welcome;

export default authenticateSlice.reducer;
