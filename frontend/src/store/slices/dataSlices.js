import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  currentChannel: 'general',
};

const dataSlices = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
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
    }
  },
});

const selectData = (state) => state.data.data;
const selectLoading = (state) => state.data.isLoading;
const selectError = (state) => state.data.error;
const selectCurrentChannel = (state) => state.data.currentChannel;

export const { setData, setError, setLoading, setCurrentChannel } = dataSlices.actions;
export default dataSlices.reducer;
export { selectData, selectLoading, selectError, selectCurrentChannel };
