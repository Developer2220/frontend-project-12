/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
  modalType: null,
  modalChannel: null,
};

const modalsSlices = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalShow: (state, action) => {
      state.modalShow = action.payload.modalShow;
      state.modalType = action.payload.modalType;
      console.log('action.payload', action.payload)
//  Используем current(state) для логирования актуального состояния
 console.log('Текущий стейт in changeModalShow:', current(state));    

},
setModalChannel: (state, action) => {
    state.modalChannel = action.payload
    console.log('Текущий стейт:', current(state));    
} 
},
});

const selectChangeModalShow = (state) => state.modals.modalShow;
const selectChangeModalType = (state) => state.modals.modalType;
const selectSetModalChannel = (state) => state.modals.modalChannel;


export const { changeModalShow, setModalChannel } = modalsSlices.actions;
export default modalsSlices.reducer;
export { selectChangeModalShow, selectChangeModalType, selectSetModalChannel };
