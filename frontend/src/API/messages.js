import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../auth/authProvider";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/v1/",
    prepareHeaders: (headers) => {
        const token = getToken();
        console.log('token in messagesApi:', token)
      
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      
        return headers;
      },
}),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "messages",
    }),
  }),
});

export const {useGetMessagesQuery } = messagesApi;