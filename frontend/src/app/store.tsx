import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "features/auth/loginSlice";
import chatSlice from "features/chat/chatSlice";
import userSlice from "features/user/userSlice";
import menuSlice from "layouts/menuSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

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
    menu: menuSlice.reducer,
  }),
);

// redux-state-sync
// https://github.com/aohua/redux-state-sync
/*If you are using redux-persist, 
you may need to blacklist some of the actions that is triggered by redux-persist. 
e.g. persist/PERSIST, persist/REHYDRATE, etc.*/
const whitelist = [
  "user/logout",
  "user/setUser",
  "user/updateUser",
  "user/resetUser",
];
const stateSyncMiddleware = createStateSyncMiddleware({
  predicate: (action) => whitelist.includes(action.type),
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
