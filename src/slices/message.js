/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { sendMessage } = messageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMessages = (state) => state.message.messages;

export default messageSlice.reducer;
