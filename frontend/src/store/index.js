import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import dataReduser from './slices/dataSlices.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReduser
    }
});

export default store;