/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    welcome: true,
    hasAccount: false,
    myName: "",
    myLanguage: "",
    myEmail: "",
    password: "",
    user: false,
  },
  reducers: {
    setMyName: (state, action) => {
      state.myName = action.payload;
    },
    setWelcome: (state) => {
      state.welcome = !state.welcome;
    },
    setHasAccount: (state) => {
      state.hasAccount = !state.hasAccount;
    },
    setMyLanguage: (state, action) => {
      state.myLanguage = action.payload;
    },
    setMyEmail: (state, action) => {
      state.myEmail = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state) => {
      state.user = !state.user;
    },
  },
});

export const {
  setWelcome,
  setHasAccount,
  setMyLanguage,
  setMyName,
  setMyEmail,
  setPassword,
  setUser,
} = authenticateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWelcome = (state) => state.authenticate.welcome;
export const selectHasAccount = (state) => state.authenticate.hasAccount;
export const selectMyLanguage = (state) => state.authenticate.myLanguage;
export const selectMyName = (state) => state.authenticate.myName;
export const selectMyEmail = (state) => state.authenticate.myEmail;
export const selectPassword = (state) => state.authenticate.password;
export const selectUser = (state) => state.authenticate.user;

export default authenticateSlice.reducer;
