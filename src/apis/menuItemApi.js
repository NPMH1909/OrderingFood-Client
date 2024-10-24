import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = 'http://localhost:5000/menu';

export const menuItemApi = createApi({
    reducerPath: 'menuItemApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: ({ searchTerm, page, limit }) => ({
                url: '/getall',
                params: { page, limit, searchTerm },
            }),
        }),
        getCategory: builder.query({
            query: () => '/get-category'
        }),
        getItemByCategory: builder.query({
            query: ({ category, searchTerm, page, limit }) => ({
                url: '/getallbycategory',
                params: { category, searchTerm, page, limit },
            }),
        }),
        getTopSeller: builder.query({
            query: () => '/best-seller'
        }),
        getNewProduct: builder.query({
            query: () => '/new-product'
        }),
    }),
});

export const { useGetMenuQuery, useGetCategoryQuery, useGetItemByCategoryQuery, useGetTopSellerQuery, useGetNewProductQuery  } = menuItemApi;
