/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    welcome: true,
    hasAccount: false,
    name: "",
    language: "",
    email: "",
    password: "",
    error: "",
    user: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setWelcome: (state) => {
      state.welcome = !state.welcome;
    },
    setHasAccount: (state) => {
      state.hasAccount = !state.hasAccount;
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
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state) => {
      state.user = !state.user;
    },
  },
});

export const {
  setWelcome,
  setHasAccount,
  setLanguage,
  setName,
  setEmail,
  setPassword,
  setError,
  setUser,
} = authenticateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWelcome = (state) => state.authenticate.welcome;
export const selectHasAccount = (state) => state.authenticate.hasAccount;
export const selectLanguage = (state) => state.authenticate.language;
export const selectName = (state) => state.authenticate.name;
export const selectEmail = (state) => state.authenticate.email;
export const selectPassword = (state) => state.authenticate.password;
export const selectError = (state) => state.authenticate.error;
export const selectUser = (state) => state.authenticate.user;

export default authenticateSlice.reducer;
