import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = 'http://localhost:5000/';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
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
    register: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: ({token, verificationCode }) => ({
        url: 'create',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, 
      },
        body: { verificationCode },
      }),
    }),
    getUserById: builder.query({
      query: () => ({
        url: '',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
    }),
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: 'update',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ data }) => ({
        url: 'change-password',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useAdminLoginMutation, 
  useRegisterMutation, 
  useCreateUserMutation, 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
  useChangePasswordMutation,
  useForgotPasswordMutation,
   
} = userApi;
