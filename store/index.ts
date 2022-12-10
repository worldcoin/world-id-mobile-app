import { configureStore } from "@reduxjs/toolkit";
import credentialsReducer from "./credentialsSlice";

export const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
