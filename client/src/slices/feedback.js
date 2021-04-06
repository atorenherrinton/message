/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    serverError: "",
    validationError: "",
    snackbarMessage: "",
    isSnackbarOpen: false,
  },
  reducers: {
    setIsActionable: (state) => {
      state.isActionable = !state.isActionable;
    },
    setCancelSend: (state) => {
      state.cancelSend = !state.cancelSend;
    },
    setServerError: (state, action) => {
      state.serverError = action.payload;
    },
    setValidationError: (state, action) => {
      state.validationError = action.payload;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setIsSnackbarOpen: (state) => {
      state.isSnackbarOpen = !state.isSnackbarOpen;
    },
  },
});

export const {
  setIsActionable,
  setCancelSend,
  setServerError,
  setValidationError,
  setSnackbarMessage,
  setIsSnackbarOpen,
} = feedbackSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsActionable = (state) => state.feedback.isActionable;
export const selectCancelSend = (state) => state.feedback.cancelSend;
export const selectServerError = (state) => state.feedback.serverError;
export const selectValidationError = (state) => state.feedback.validationError;
export const selectIsSnackbarOpen = (state) => state.feedback.isSnackbarOpen;
export const selectSnackbarMessage = (state) => state.feedback.snackbarMessage;

export default feedbackSlice.reducer;
