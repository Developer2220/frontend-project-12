/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
};

const modalsSlices = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalShow: (state, action) => {
      state.modalShow = action.payload;
    }
  },
});

const selectChangeModalShow = (state) => state.modals.modalShow


export const { changeModalShow } = modalsSlices.actions;
export default modalsSlices.reducer;
export { selectChangeModalShow };
