// src/components/UserInfoCard.js
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../css/components/UserInfoCard.css";

const UserInfoCard = ({ name, email, address, phone, username, onEdit, onChangePassword }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleEditClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    if (option === "editInfo") onEdit();
    if (option === "changePassword") onChangePassword();
    setShowDropdown(false);
  };

  return (
    <div className="user-info-card">
      <div className="avatar-container">
        <FaUserCircle className="user-image" size={100} />
        <button className="edit-button" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {showDropdown && (
          <div className="dropdown">
            <div className="dropdown-option" onClick={() => handleOptionClick("editInfo")}>
              Chỉnh sửa thông tin
            </div>
            <div className="dropdown-option" onClick={() => handleOptionClick("changePassword")}>
              Đổi mật khẩu
            </div>
          </div>
        )}
      </div>
      <h3>Thông tin người dùng</h3>
      <p><strong>Họ tên:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Địa chỉ:</strong> {address}</p>
      <p><strong>Số điện thoại:</strong> {phone}</p>
      <p><strong>Username:</strong> {username}</p>
    </div>
  );
};

export default UserInfoCard;
