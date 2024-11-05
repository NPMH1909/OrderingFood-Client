import React from 'react';
import './css/header.css';
import SearchIcon from '../assets/SearchIcon.png';
import UserIcon from '../assets/UserIcon.png';
import CartIcon from '../assets/CartIcon.png';

const Header = () => {
  return (
    <div className="header">
      <div className="top-bar">
        <div className="logo">
          <img src="https://idodesign.vn/wp-content/uploads/2023/04/40-thiet-ke-logo-mau-do-cham-den-trai-tim-khach-hang-11.jpg" alt="Logo" />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#delivery">Delivery</a>
          <a href="#about">About</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>
          <img src={SearchIcon} alt="Search" />
          </button>
        </div>
        <div className="nav-links">
          <button>
            <img src={UserIcon} alt="User" />
          </button>
          <button>
            <img src={CartIcon} alt="Cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;