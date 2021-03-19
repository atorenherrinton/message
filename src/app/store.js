/** @format */

import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slices/message";
import authenticateReducer from "../slices/authenticate";

export default configureStore({
  reducer: {
    message: messageReducer,
    authenticate:authenticateReducer,
  },
});
