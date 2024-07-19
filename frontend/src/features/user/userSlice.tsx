import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: null,
  email: "",
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
      state.id = action.payload.id;
      state.email = action.payload.email;
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
