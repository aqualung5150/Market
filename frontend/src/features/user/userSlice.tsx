import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// interface UserState {
//   id: number | null;
//   email: string;
//   name: string;
//   nickname: string;
//   iat: number | null;
//   exp: number | null;
// }

const initialState = {
  id: null,
  email: "",
  name: "",
  nickname: "",
  image: "",
  iat: null,
  exp: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //   state = { ...action.payload };
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.iat = action.payload.iat;
      state.exp = action.payload.exp;
    },

    resetUser: () => initialState,

    updateUser: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        Object.assign(state, { [key]: value });
      });
    },

    logout: (state, action) => {
      const url = `${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
      axios.post(url, {}).catch(() => {});

      window.location.href = action.payload;
      return initialState;
    },
  },
});

export default userSlice;

export const { setUser, resetUser, updateUser, logout } = userSlice.actions;
