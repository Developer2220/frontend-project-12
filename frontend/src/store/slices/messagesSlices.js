import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const messagesSlices = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      },
      setLoading: (state) => {
        state.isLoading = true;
      },
  },
});

const selectMessages = (state) => state.messages.messages;

const selectLoading = (state) => state.messages.isLoading;
const selectError = (state) => state.messages.error;


export const { setMessages, setLoading, setError } = messagesSlices.actions;
export default messagesSlices.reducer;
export { selectMessages, selectLoading, selectError };