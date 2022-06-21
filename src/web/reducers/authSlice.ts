import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, getToken, getUserStorage } from "../helpers";
import { RootState } from "../store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: checkAuth(),
    user: getUserStorage(),
    token: getToken(),
    error: null,
    loading: false,
  },

  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
