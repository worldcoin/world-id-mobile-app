import { combineReducers, configureStore } from "@reduxjs/toolkit";
import credentialsReducer from "./credentialsSlice";
import secureReducer from "./secureSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSecureStorage from "./secureStore";

const secureStorage = createSecureStorage();

const persistConfig = {
  key: "main",
  storage: AsyncStorage,
};

const securePersistConfig = {
  key: "secureStorage",
  storage: secureStorage,
};

const mainReducer = persistReducer(
  persistConfig,
  combineReducers({ credentials: credentialsReducer })
);

const rootReducer = combineReducers({
  main: mainReducer,
  secure: persistReducer(securePersistConfig, secureReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  // See https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
