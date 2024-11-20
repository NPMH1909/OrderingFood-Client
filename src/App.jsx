import { useEffect, useState } from "react";
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { setCart } from './slices/cartSlice'
import CheckoutPage from './pages/CheckOutPage'
import Layout from './layouts/Layout'
import OrderHistory from "./pages/OrderHistoryPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const username = localStorage.getItem("user");
  //   if (username) {
  //     const savedCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
  //     dispatch(setCart(savedCart));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/history" element={<OrderHistory />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        {/* <Route path="dashboard" element={<AdminPage />} /> */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="loginAD" element={<AdminLoginPage />} />
        <Route path="verify-code" element={<VerifyCodePage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <AdminPage /> 
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
// import ContactForm from "./client/pages/user/contactForm.js";
// import UserInfoForm from "./client/pages/user/UserInfoForm.js";
// import DishManageForm from "./Tham/pages/admin/DishManageForm.js";
// const App = () => {
//   return (
//     <div>
//       {/* header */}
//       <DishManageForm />
//       {/* footer */}
//     </div>
//   );
// };

export default App;
