/** @format */

import { configureStore } from "@reduxjs/toolkit";
import actionsReducer from "../slices/actions";

import authenticateReducer from "../slices/authenticate";
import communicateReducer from "../slices/communicate";
import feedbackReducer from "../slices/feedback";

export default configureStore({
  reducer: {
    actions: actionsReducer,
    authenticate: authenticateReducer,
    communicate: communicateReducer,
    feedback: feedbackReducer,
  },
});
