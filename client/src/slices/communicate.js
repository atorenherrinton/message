/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const communicateSlice = createSlice({
  name: "communicate",
  initialState: {
    messages: [],
    isChatOpen: false,
    isAddingFriend: false,
    otherEmail: "",
    otherName: "",
    otherLanguage: "",
  },
  reducers: {
    resetMessages: (state) => {
      state.messages = [];
    },
    setAddingFriend: (state) => {
      state.isAddingFriend = !state.isAddingFriend;
    },
    setIsChatOpen: (state, action) => {
      state.isChatOpen = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setOtherEmail: (state, action) => {
      state.otherEmail = action.payload;
    },
    setOtherName: (state, action) => {
      state.otherName = action.payload;
    },
    setOtherLanguage: (state, action) => {
      state.otherLanguage = action.payload;
    },
  },
});

export const {
  resetMessages,
  setMessages,
  setAddingFriend,
  setIsChatOpen,
  setOtherEmail,
  setOtherName,
  setOtherLanguage,
} = communicateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsChatOpen = (state) => state.communicate.isChatOpen;
export const selectIsAddingFriend = (state) => state.communicate.isAddingFriend;
export const selectOtherEmail = (state) => state.communicate.otherEmail;
export const selectOtherName = (state) => state.communicate.otherName;
export const selectOtherLanguage = (state) => state.communicate.otherLanguage;
export const selectMessages = (state) => state.communicate.messages;

export default communicateSlice.reducer;
