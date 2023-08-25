import { configureStore } from "@reduxjs/toolkit";
import masterReducer from "./masterSlice";

// Object that stores all of our top-level states (like the master and variant)
export const reduxStore = configureStore({
  reducer: {
    master: masterReducer,
  },
});
