import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import emailReducer from "./reducers/emailSlice";
import authReducer from "./reducers/authSlice";
import mapReducer from './reducers/mapSlice';

export const store = configureStore({
  reducer: { email: emailReducer, auth: authReducer, map: mapReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
