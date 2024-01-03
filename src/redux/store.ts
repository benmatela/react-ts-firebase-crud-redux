import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productsReducer from "./products/products";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import logger from "redux-logger";

// https://dev.to/johongirr/react-todo-crud-app-with-redux-and-typescript-584m
// https://www.youtube.com/watch?v=iBUJVy8phqw&ab_channel=NetNinja

/**
 * Persistance - What keeps the data even after refreshing the website
 */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Reducers used to persist the "state"
const productsPersistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  // The different reducers
  reducer: { productsPersistedReducer },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      logger,
    }).concat(logger), // Concat middleware with logger
});

const persistor = persistStore(store);

export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
