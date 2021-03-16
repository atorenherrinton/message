/** @format */

import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slices/message";

export default configureStore({
  reducer: {
    message: messageReducer,
  },
});
