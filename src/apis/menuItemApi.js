import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;
const URL = `${BASE_URL}/menu/`;
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
        getMenuForAdmin: builder.query({
            query: ({ searchTerm, page, limit }) => ({
                url: '/admin/getall',
                params: { page, limit, searchTerm },
            }),
        }),
        addItem: builder.mutation({
            query: ({ menuItemData }) => {
                const formData = new FormData();
                formData.append("name", menuItemData.name);
                formData.append("description", menuItemData.description);
                formData.append("price", menuItemData.price);
                formData.append("isAvailable", menuItemData.isAvailable);
                formData.append("category", menuItemData.category);
                if (menuItemData.image) {
                    formData.append("image", menuItemData.image); 
                }
                return {
                    url: "/create",
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                    body: formData,
                };
            },
        }),
        updateItem: builder.mutation({
            query: ({id, menuItemData }) => {
                const formData = new FormData();
                formData.append("name", menuItemData.name);
                formData.append("description", menuItemData.description);
                formData.append("price", menuItemData.price);
                formData.append("isAvailable", menuItemData.isAvailable);
                formData.append("category", menuItemData.category);
                if (menuItemData.image) {
                    formData.append("image", menuItemData.image); 
                }
                return {
                    url: `/update/${id}`,
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                    body: formData,
                };
            },
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                    url: `/delete-item/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                    body: {id}
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
        getItemByCategoryForAdmin: builder.query({
            query: ({ category, searchTerm, page, limit }) => ({
                url: '/admin/getallbycategory',
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

export const { 
    useGetMenuQuery,
    useGetCategoryQuery,
    useGetItemByCategoryQuery,
    useGetTopSellerQuery,
    useGetNewProductQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useGetMenuForAdminQuery,
    useGetItemByCategoryForAdminQuery
} = menuItemApi;
