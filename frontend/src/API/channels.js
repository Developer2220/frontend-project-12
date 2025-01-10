import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../auth/authProvider";

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/v1/",
    prepareHeaders: (headers) => {
        const token = getToken();
        console.log('token in channelsApi:', token)
      
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      
        return headers;
      },
}),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => "channels",
    }),
    addChannel: builder.mutation({
        query: (newChannel) => ({
          url: "channels",
          method: "POST",
          body: newChannel,
        }),
    }),
    deleteChannel: builder.mutation({
        query: (id) =>({
            url: `channels/${id}`,
            method: "DELETE",
        })
    })
  }),
});

export const { useGetChannelsQuery, useAddChannelMutation, useDeleteChannelMutation } = channelsApi;
