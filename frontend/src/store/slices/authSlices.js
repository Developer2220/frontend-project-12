import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    isAuthenticated: !!localStorage.getItem("token"),
  });

  // console.log('initialState', initialState)
  // console.log("Initial State:", initialState);

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuthenticated: (state, action) => {
        console.log('Previous State:', state.isAuthenticated);
        console.log('Payload:', action.payload);
        state.isAuthenticated = action.payload;
        console.log('Updated State:', state.isAuthenticated);
      },
    },
  });


  export const { setAuthenticated } = authSlice.actions;
  export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;
  export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null, // Initially, no user is logged in
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     logoutSuccess: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { loginSuccess, logoutSuccess } = authSlice.actions;
// export default authSlice.reducer;