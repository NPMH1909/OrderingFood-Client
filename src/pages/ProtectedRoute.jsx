import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Kiểm tra người dùng đã đăng nhập chưa (ví dụ dùng token, Redux store, v.v.)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); // Giả sử bạn lưu trạng thái đăng nhập admin vào localStorage
  const location = useLocation();

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/loginAD" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
