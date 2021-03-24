/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const communicateSlice = createSlice({
  name: "communicate",
  initialState: {
    friendRequests: [],
    isAddingFriend: false,
    inviteSent: false,
  },
  reducers: {
    loadFriendRequests: (state, action) => {
      state.friendRequests = [...state.friendRequests, action.payload];
    },
    setAddingFriend: (state) => {
      state.isAddingFriend = !state.isAddingFriend;
    },
    setInviteSent: (state) => {
      state.inviteSent = !state.inviteSent;
    },
  },
});

export const {
  loadFriendRequests,
  setAddingFriend,
  setInviteSent,
} = communicateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFriendRequests = (state) => state.communicate.friendRequests;
export const selectIsAddingFriend = (state) => state.communicate.isAddingFriend;
export const selectInviteSent = (state) => state.communicate.inviteSent;

export default communicateSlice.reducer;
