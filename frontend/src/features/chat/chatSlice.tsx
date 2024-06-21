import { createSlice } from "@reduxjs/toolkit";

// interface Message {
//   body: string;
// }

// interface Channel {
//   messages: Message[];
// }

// interface ChatSliceState {
//   channels: Channel[];
// }

const initialState = {
  // channels: [],
  open: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenChat: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default chatSlice;

export const { setOpenChat } = chatSlice.actions;
