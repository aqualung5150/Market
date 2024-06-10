import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { ConnectionState } from "../@types/user";

const initialState: ConnectionState = {
  //   id: undefined,
  //   email: "",
  name: "",
  //   nickname: "",
  //   iat: undefined,
  //   exp: undefined,
  //   socket: null,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //   state.id = action.payload.id;
      //   state.email = action.payload.email;
      state.name = action.payload.name;
      //   state.nickname = action.payload.nickname;
      //   state.iat = action.payload.iat;
      //   state.exp = action.payload.exp;
      //   state.socket = action.payload.socket;
    },
    logoutUser: (state) => {
      //   state.id = undefined;
      //   state.email = "";
      state.name = "";
      //   state.nickname = "";
      //   state.iat = undefined;
      //   state.exp = undefined;
      //   state.socket = null;
    },
  },
});

export const fooSlice = createSlice({
  name: "foo",
  initialState: {
    value: "",
  },
  reducers: {
    setFoo: (state, action) => {
      state.value = action.payload.fooInput;
    },
  },
});

// export const rootReducer = combineReducers({
//   foo: fooSlice.reducer,
//   connection: connectionSlice.reducer,
// });

export const fooReducer = fooSlice.reducer;

// export type RootState = ReturnType<typeof rootReducer>;
