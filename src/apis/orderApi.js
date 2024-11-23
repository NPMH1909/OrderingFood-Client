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
            query: ({ page, limit }) => ({
                url: '/user/getall',
                params: { page, limit }
            })
        }),
        getAllOrder: builder.query({
            query: ({ email, status, page = 1, limit = 10, date }) => ({
                url: '/getall', 
                params: { email, status, page, limit, date },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                }, 
            })
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                }, 
                body: { status },
            }),
        }),
        getRevenueForWeek: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/revenue/week`,
                method: 'GET',
                params: { startDate, endDate }, // Truyền query params
            }),
        }),
        // Endpoint để lấy doanh thu theo tháng
        getRevenueForMonth: builder.query({
            query: ({ month, year }) => ({
                url: `/revenue/month`,
                method: 'GET',
                params: { month, year }, // Truyền query params
            }),
        }),
        getDailyRevenue: builder.query({
            query: (date) => `/revenue/date?date=${date}`, // Gửi ngày trong query string
        }),
        // API lấy doanh thu theo năm
        getYearlyRevenue: builder.query({
            query: (year) => `/revenue/year?year=${year}`, // Gửi năm trong query string
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useCreatePaymentOrderMutation,
    useGetAllOrderByUserQuery,
    useGetAllOrderQuery,
    useUpdateOrderStatusMutation,
    useGetRevenueForWeekQuery,
    useGetRevenueForMonthQuery,
    useGetDailyRevenueQuery,
    useGetYearlyRevenueQuery
} = orderApi;
