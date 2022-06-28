import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    value: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.value = action.payload;
    },
    resetEmail: (state) => {
      state.value = '';
    }
  },
});

export const { setEmail, resetEmail } = emailSlice.actions;

export default emailSlice.reducer;

export const selectEmail = (state: RootState) => state.email.value;
