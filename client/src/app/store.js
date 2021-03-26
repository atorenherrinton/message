/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../slices/authenticate";
import communicateReducer from "../slices/communicate";
import feedbackReducer from "../slices/feedback";

export default configureStore({
  reducer: {
    authenticate: authenticateReducer,
    communicate: communicateReducer,
    feedback: feedbackReducer,
  },
});
  