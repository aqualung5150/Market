import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice.reducer,
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
