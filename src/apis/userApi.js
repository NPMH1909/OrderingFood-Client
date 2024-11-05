import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = 'http://localhost:5000/';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: 'admin-login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserById: builder.query({
      query: () => '',
    }),
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: 'update',
        method: 'PUT',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: ({data }) => ({
        url: 'change-password', 
        method: 'PUT',     
        body: data,
    }),
    }),
  }),
});

export const { useLoginMutation, useGetUserByIdQuery, useUpdateUserMutation, useChangePasswordMutation, useAdminLoginMutation } = userApi;
