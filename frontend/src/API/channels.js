import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../auth/authProvider';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    tagTypes: ['Channel'],
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, newChannelName }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name: newChannelName },
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useDeleteChannelMutation, useUpdateChannelMutation,
} = channelsApi;
