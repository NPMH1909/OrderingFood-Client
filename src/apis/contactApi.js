// src/services/contactApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;
const URL = `${BASE_URL}/contact/`;

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }), // Base URL cho backend
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (contactData) => ({
        url: '/',
        method: 'POST',
        body: contactData, // Gửi dữ liệu form contact
      }),
    }),
    // Thêm endpoint getAllContacts để lấy tất cả liên hệ
    getAllContacts: builder.query({
      query: ({page = 1, limit = 10, date }) => ({
        url: '/getall',
        params: {page, limit, date },
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
