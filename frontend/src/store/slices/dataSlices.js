import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
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
  },
});

const selectData = (state) => state.data.data;
const selectLoading = (state) => state.data.isLoading;
const selectError = (state) => state.data.error;

export const { setData, setError, setLoading } = dataSlices.actions;
export default dataSlices.reducer;
export { selectData, selectLoading, selectError };
