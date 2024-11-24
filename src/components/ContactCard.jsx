// src/components/ContactCard.js
import React from "react";
import "../css/components/contactCard.css";

const ContactCard = ({ name, email, content, onNameChange, onEmailChange, onContentChange, onSubmit, isLoading }) => {
  return (
    <div className="outer-card">
      <div className="contact-card">
        <h3>Thông tin liên hệ</h3>
        <div className="form-field">
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Nhập tên của bạn"
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Nhập email của bạn"
          />
        </div>
        <div className="form-field">
          <label>Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Nhập nội dung đánh giá"
          />
        </div>
        <button
          type="button"
          className="submit-button"
          onClick={onSubmit}
          disabled={isLoading} // Disable khi đang gửi
        >
          {isLoading ? "Đang gửi..." : "Gửi liên hệ"}
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
