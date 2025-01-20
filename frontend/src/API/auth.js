import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../auth/authProvider";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/v1/",
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
          url: "login",
          method: "POST",
          body: user,
        }),
    }),
    // deleteChannel: builder.mutation({
    //     query: (id) =>({
    //         url: `channels/${id}`,
    //         method: "DELETE",
    //     }),
    // }),
    // updateChannel: builder.mutation({
    //     query: ({id, newChannelName}) =>({
    //         url: `channels/${id}`,
    //         method: "PATCH",
    //         body: {name: newChannelName},
    //     }),
    // }),
  }),
});

export const { useAuthenticateMutation } = authApi;
