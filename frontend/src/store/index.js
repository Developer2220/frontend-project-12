import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import channelsReduser from './slices/channelsSlices.js'
import messagesReduser from './slices/messagesSlices.js'
import dataReduser from './slices/dataSlices.js'

import { channelsApi } from "../API/channels";
import { messagesApi } from "../API/messages";

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReduser, 
        channels: channelsReduser, 
        messages: messagesReduser,
        [channelsApi.reducerPath]: channelsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(channelsApi.middleware)
        .concat(messagesApi.middleware),   

});

export default store;