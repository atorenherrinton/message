/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const actionsSlice = createSlice({
  name: "actions",
  initialState: {
    openDialog: false,
    openDropdown: false,
  },
  reducers: {
    setOpenDialog: (state) => {
      state.openDialog = !state.openDialog;
    },
    setOpenDropdown: (state) => {
      state.openDropdown = !state.openDropdown;
    },
  },
});

export const { setOpenDialog, setOpenDropdown } = actionsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectOpenDialog = (state) => state.actions.openDialog;
export const selectOpenDropdown = (state) => state.actions.openDropdown;

export default actionsSlice.reducer;
