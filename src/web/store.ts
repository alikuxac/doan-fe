import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import emailReducer from "./reducers/emailSlice";
import globalReducer from './reducers/globalSlice';

export const store = configureStore({
  reducer: { email: emailReducer, global: globalReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
