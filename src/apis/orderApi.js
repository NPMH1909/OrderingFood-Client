// services/orderApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = 'http://localhost:5000/orders';

export const orderApi = createApi({
    reducerPath: 'orderApi',
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
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/create', 
                method: 'POST',
                body: orderData,
            }),
        }),
        createPaymentOrder: builder.mutation({
            query: (paymentData) => ({
                url: '/create-link', // Đường dẫn API
                method: 'POST',
                body: paymentData, // Dữ liệu thanh toán
            }),
        }),
        getAllOrderByUser: builder.query({
            query: ({page, limit}) => ({
                url: '/user/getall',
                params: {page, limit}
            })
        }),
    }),
});

export const { useCreateOrderMutation, useCreatePaymentOrderMutation, useGetAllOrderByUserQuery } = orderApi;
