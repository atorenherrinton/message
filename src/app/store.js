/** @format */

import { configureStore } from "@reduxjs/toolkit";
import communicateReducer from "../slices/communicate";
import authenticateReducer from "../slices/authenticate";

export default configureStore({
  reducer: {
    communicate: communicateReducer,
    authenticate: authenticateReducer,
  },
});
