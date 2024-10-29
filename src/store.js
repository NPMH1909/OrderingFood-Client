// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { menuItemApi } from './apis/menuItemApi';
import cartReducer from './slices/cartSlice'
import { userApi } from './apis/userApi';
import userReducer from './slices/userSlice'
import { orderApi } from './apis/orderApi';
import { cartApi } from './apis/cartApi';
const persistedUserInfo = JSON.parse(localStorage.getItem("userData"));

// const username = localStorage.getItem("user");
// const persistedCart = username ? JSON.parse(localStorage.getItem(`cart_${username}`)) : [];

const preloadedState = {
  user: {
    userInfo: persistedUserInfo || null,
  },
  // cart: {
  //   items: persistedCart || [],
  // },
};

export const store = configureStore({
  reducer: {
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
    user: userReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware)
      .concat(cartApi.middleware)
});