/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: { id: '1', name: 'general', removable: false },
};

const channelsSlices = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

const selectCurrentChannel = (state) => state.channels.currentChannel;

export const { setCurrentChannel } = channelsSlices.actions;
export default channelsSlices.reducer;
export { selectCurrentChannel };
