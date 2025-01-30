import { configureStore } from '@reduxjs/toolkit';
import channelsReduser from './slices/channelsSlices.js';
import modalsReduser from './slices/modalsSlices.js';
import { channelsApi } from '../API/channels';
import { messagesApi } from '../API/messages';
import { authApi } from '../API/auth';

const store = configureStore({
  reducer: {
    channels: channelsReduser,
    modals: modalsReduser,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware)
    .concat(authApi.middleware),
});

export default store;
