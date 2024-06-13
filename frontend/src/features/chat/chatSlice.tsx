import { createSlice } from "@reduxjs/toolkit";

interface Message {
  body: string;
}

interface Channel {
  messages: Message[];
}

interface ChatSliceState {
  channels: Channel[];
}

const initialState: ChatSliceState = {
  channels: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export default chatSlice;
