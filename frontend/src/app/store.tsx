import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/user/userSlice";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import chatSlice from "../features/chat/chatSlice";
import loginSlice from "../features/auth/loginSlice";

// redux-persist

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
    chat: chatSlice.reducer,
    login: loginSlice.reducer,
  })
);

// redux-state-sync
// https://github.com/aohua/redux-state-sync
/*If you are using redux-persist, 
you may need to blacklist some of the actions that is triggered by redux-persist. 
e.g. persist/PERSIST, persist/REHYDRATE, etc.*/
const stateSyncMiddleware = createStateSyncMiddleware({
  blacklist: [
    "persist/PERSIST",
    "persist/REHYDRATE",
    // "persist/FLUSH",
    // "persist/PAUSE",
    // "persist/PURGE",
    // "persist/REGISTER",
  ],
  whitelist: ["user"],
});

// createStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stateSyncMiddleware) as any,
});

initMessageListener(store);

export const persistor = persistStore(store);
export default store;

export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
