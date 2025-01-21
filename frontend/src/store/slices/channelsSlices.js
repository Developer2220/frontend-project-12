import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  isLoading: false,
  error: null,
  currentChannel: {id: '1', name: 'general', removable: false}
};

const channelsSlices = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },

    setCurrentChannel: (state, action)=> {
        state.currentChannel = action.payload;
        console.log('state.currentChannel', state.currentChannel)
    }
  },
});

const selectChannels = (state) => state.channels.channels;
const selectLoading = (state) => state.channels.isLoading;
const selectError = (state) => state.channels.error;

const selectCurrentChannel = (state) => state.channels.currentChannel;

export const { setChannels, setCurrentChannel, setLoading, setError } = channelsSlices.actions;
export default channelsSlices.reducer;
export { selectChannels, selectCurrentChannel, selectLoading, selectError };