import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import countReducer from "./reducers/countSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: { count: countReducer, auth: authReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
