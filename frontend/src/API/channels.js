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
  }),
});

export const { useGetChannelsQuery } = channelsApi;
