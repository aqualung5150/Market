import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  sendTo: 0,
  noti: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenChat: (state, action) => {
      state.open = action.payload;
    },
    setSendTo: (state, action) => {
      state.sendTo = action.payload;
    },
    setNoti: (state, action) => {
      state.noti = action.payload;
    },
  },
});

export default chatSlice;

export const { setOpenChat, setSendTo, setNoti } = chatSlice.actions;
