import React, { useState } from "react";
import "../styles/components/contactCard.css";

const ContactCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  return (
    <div className="outer-card">
      <div className="contact-card">
        <h3>Thông tin liên hệ</h3>
        <div className="form-field">
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nhập tên của bạn"
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Nhập email của bạn"
          />
        </div>
        <div className="form-field">
          <label>Nội dung:</label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Nhập nội dung đánh giá"
          />
        </div>
        <button type="button" className="submit-button">
          Gửi liên hệ
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
