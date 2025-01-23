import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../auth/authProvider';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    create: builder.mutation({
      query: (newUser) => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),

});

export const { useAuthenticateMutation, useCreateMutation } = authApi;
