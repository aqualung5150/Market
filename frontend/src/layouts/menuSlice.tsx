import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export default menuSlice;
export const { setToggle } = menuSlice.actions;
