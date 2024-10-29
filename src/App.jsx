import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import  CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { setCart } from './slices/cartSlice'
import CheckoutPage from './pages/CheckOutPage'
import CancelOrderPage from './pages/CancelOrderPage'
import SuccesOrderPage from './pages/SuccesOrderPage'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      const username = localStorage.getItem("user");
      if (username) {
          const savedCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
          dispatch(setCart(savedCart));
      }
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout-cancel" element={<CancelOrderPage />} />
      <Route path="/checkout-success" element={<SuccesOrderPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
