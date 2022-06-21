import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const countSlice = createSlice({
  name: "count",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = countSlice.actions;

export default countSlice.reducer;

export const selectCount = (state: RootState) => state.count.value;
