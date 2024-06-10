import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { connectionSlice, fooReducer, fooSlice } from "./connectionSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["connection"],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    connection: connectionSlice.reducer,
    foo: fooReducer,
  })
);

// const rootReducer = combineReducers({
//   connection: connectionSlice.reducer,
//   foo: fooReducer,
// });

export const store = configureStore({
  //   reducer: {
  //     connection: connectionSlice.reducer,
  //     // foo: fooSlice.reducer,
  //     foo: fooReducer,
  //   },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

// export const store = createStore(rootReducer);

export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
