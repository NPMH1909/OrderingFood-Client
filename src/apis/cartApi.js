import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'http://localhost:5000/carts';

export const cartApi = createApi({
    reducerPath: 'cartApi',
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
        getCart: builder.query({
            query: () => '/',
            providesTags: ['Cart'],
        }),
        addItemToCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: `/add`,
                method: 'POST',
                body: { productId, quantity },
            }),
            invalidatesTags: ['Cart'],
        }),
        removeItemFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/remove`,
                method: 'DELETE',
                body: { itemId },
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
} = cartApi;