import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setOpenLogin: (state, action) => {
      state.openLogin = action.payload;
    },
  },
});

export default loginSlice;
export const { setOpenLogin } = loginSlice.actions;
