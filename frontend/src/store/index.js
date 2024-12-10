import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import channelsReduser from './slices/channelsSlices.js'
import messagesReduser from './slices/messagesSlices.js'
import dataReduser from './slices/dataSlices.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReduser, 
        channels: channelsReduser, 
        messages: messagesReduser,
    }
});

export default store;