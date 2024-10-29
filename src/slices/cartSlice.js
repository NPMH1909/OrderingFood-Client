import { createSlice } from '@reduxjs/toolkit';

// Load initial cart data from localStorage based on the saved username
const username = localStorage.getItem("user") || null;
const initialCart = username ? JSON.parse(localStorage.getItem(`cart_${username}`)) || [] : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart,
    username: username,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1; 
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      if (state.username) {
        localStorage.setItem(`cart_${state.username}`, JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      if (state.username) {
        localStorage.setItem(`cart_${state.username}`, JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (state.username) {
        localStorage.setItem(`cart_${state.username}`, JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (state.username) {
        localStorage.removeItem(`cart_${state.username}`);
      }
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      // Load the cart for the new user from localStorage
      state.items = JSON.parse(localStorage.getItem(`cart_${action.payload}`)) || [];
    }
  }
});

export const { setCart, addToCart, updateQuantity, removeFromCart, clearCart, setUsername } = cartSlice.actions;
export default cartSlice.reducer;
