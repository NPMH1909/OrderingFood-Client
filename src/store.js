// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { menuItemApi } from './apis/menuItemApi';


export const store = configureStore({
  reducer: {
    [menuItemApi.reducerPath] : menuItemApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuItemApi.middleware), 
});