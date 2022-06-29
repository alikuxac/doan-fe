import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import emailReducer from "./reducers/emailSlice";
import authReducer from "./reducers/authSlice";
import mapReducer from './reducers/mapSlice';
import searchSlice from "./reducers/searchSlice";
import directionsSlice from "./reducers/directionsSlice";

export const store = configureStore({
  reducer: { email: emailReducer, auth: authReducer, map: mapReducer, search: searchSlice, directions: directionsSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
