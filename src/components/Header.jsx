import React, { useEffect, useState } from 'react';
import '../css/components/header.css';
import SearchIcon from '../assets/SearchIcon.png';
import UserIcon from '../assets/UserIcon.png';
import CartIcon from '../assets/CartIcon.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '../slices/userSlice';
import { MenuItem } from '@material-tailwind/react';
import { setSearchTerm } from '../slices/searchSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserInfo(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(clearUserInfo());
    setUserInfo(null); 
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('user-menu');
      if (menu && !menu.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCartClick = () => {
    if (userInfo) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue)); // Cập nhật searchTerm khi nhấn tìm kiếm
  };

  return (
    <div className="header sticky top-0 z-10">
      <div className="top-bar">
        <div className="logo">
          <img src="https://idodesign.vn/wp-content/uploads/2023/04/40-thiet-ke-logo-mau-do-cham-den-trai-tim-khach-hang-11.jpg" alt="Logo" />
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/product">Menu</a>
          <a href="#delivery">Delivery</a>
          <a href="/contact">About</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={handleSearch}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>
        <div className="nav-links">
          {userInfo ? (
            <div className="relative" id="user-menu">
              <button onClick={() => setIsMenuOpen((prev) => !prev)}>
                <img src={UserIcon} alt="User" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 text-black transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <MenuItem onClick={() => {
                    navigate('/profile')
                    setIsMenuOpen(false)
                  }} className="hover:bg-gray-100 transition-colors duration-200 m-4 border-b border-gray-200 pb-2">
                    Thông tin người dùng
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/order/history')
                    setIsMenuOpen(false)
                  }} className="hover:bg-gray-100 transition-colors duration-200 m-4 border-b border-gray-200 pb-2">
                    Lịch sử đặt hàng
                  </MenuItem>
                  <MenuItem onClick={handleLogout} className="hover:bg-gray-100 transition-colors duration-200 m-4">
                    Đăng xuất
                  </MenuItem>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => { navigate('/login') }}>
              Sign in
            </button>
          )}
          <button onClick={handleCartClick}>
            <img src={CartIcon} alt="Cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
