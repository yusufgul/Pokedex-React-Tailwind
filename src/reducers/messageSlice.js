import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    show: false,
    header: null,
    body: null,
    color: null,
  },
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice;
