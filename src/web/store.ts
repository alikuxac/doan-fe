import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import countReducer from "./reducers/countSlice";
import authReducer from "./reducers/authSlice";
import mapReducer from './reducers/mapSlice';

export const store = configureStore({
  reducer: { count: countReducer, auth: authReducer, map: mapReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
