import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/UserInfoCard.css";

const UserInfoCard = ({ name, email, address, phone, username }) => {
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái hiển thị dropdown

  // Hàm xử lý khi nhấn nút chỉnh sửa
  const handleEditClick = () => {
    setShowDropdown(!showDropdown); // Chuyển đổi hiển thị dropdown
  };

  // Hàm xử lý khi chọn một tùy chọn
  const handleOptionClick = (option) => {
    console.log(option);
    setShowDropdown(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="user-info-card">
      <div className="avatar-container">
        <FaUserCircle className="user-image" size={100} />
        <button className="edit-button" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {/* Dropdown sẽ xuất hiện bên dưới nút chỉnh sửa */}
        {showDropdown && (
          <div className="dropdown">
            <div
              className="dropdown-option"
              onClick={() => handleOptionClick("editInfo")}
            >
              Chỉnh sửa thông tin
            </div>
            <div
              className="dropdown-option"
              onClick={() => handleOptionClick("changePassword")}
            >
              Đổi mật khẩu
            </div>
          </div>
        )}
      </div>
      <h3>Thông tin người dùng</h3>
      <p>
        <strong>Họ tên:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {address}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {phone}
      </p>
      <p>
        <strong>Username:</strong> {username}
      </p>
    </div>
  );
};

export default UserInfoCard;
