// Master Resume Reducer, but It's called a slice! I disagree with this name
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  val: 0,
};

export const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    add1: (state) => {
      state.val += 1;
    },
    sub1: (state) => {
      state.val -= 1;
    },
    set0: (state) => {
      state.val = 0;
    },
  },
});

export const { add1, sub1, set0 } = masterSlice.actions;
const masterReducer = masterSlice.reducer;
export default masterReducer;
