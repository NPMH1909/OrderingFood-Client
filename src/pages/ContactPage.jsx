// src/pages/ContactPage.js
import React, { useState, useEffect } from "react";
import { useCreateContactMutation } from "../apis/contactApi";
import { useGetUserByIdQuery } from "../apis/userApi"; // Hook API để lấy thông tin người dùng
import ContactCard from "../components/contactCard";
import "../css/pages/contactForm.css";
import RestaurantMap from "../components/RestaurantMap";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const [successMessage, setSuccessMessage] = useState(""); // State cho thông báo thành công
  const [errorMessage, setErrorMessage] = useState(""); // State cho thông báo lỗi
  const [emailError, setEmailError] = useState(""); // State cho thông báo lỗi email

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(); // Sử dụng hook để lấy thông tin người dùng
  const [createContact, { isLoading, isError, error, isSuccess }] = useCreateContactMutation();
  const user = userData?.data;

  useEffect(() => {
    // Khi dữ liệu người dùng đã được tải về, cập nhật name và email
    if (user) {
      setName(user.name || ""); // Nếu không có tên, để trống
      setEmail(user.email || ""); // Nếu không có email, để trống
    }
  }, [user]); // Cập nhật khi `user` thay đổi

  // Hàm validate email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường bắt buộc trống
    if (!name || !email || !content) {
      setErrorMessage("Tất cả các trường đều phải được điền!");
      setTimeout(() => setErrorMessage(""), 3000); // Ẩn thông báo sau 3 giây
      return; // Dừng việc gửi nếu có trường nào trống
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ!");
      setTimeout(() => setEmailError(""), 3000); // Ẩn thông báo sau 3 giây
      return;
    }

    const contactData = { name, email, message: content };

    try {
      // Gọi API gửi thông tin liên hệ
      await createContact(contactData).unwrap();
      setSuccessMessage("Cảm ơn sự góp ý của bạn!");
      setContent(""); // Reset content sau khi gửi thành công
      setTimeout(() => setSuccessMessage(""), 3000); // Ẩn thông báo sau 3 giây
    } catch (err) {
      setErrorMessage("Đã xảy ra lỗi khi gửi thông tin!");
      setTimeout(() => setErrorMessage(""), 3000); // Ẩn thông báo sau 3 giây
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <RestaurantMap />
      </div>

      {/* Hiển thị thông báo nếu có */}
      {successMessage && (
        <div className="notification show">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="notification error show">{errorMessage}</div>
      )}
      {emailError && (
        <div className="notification error show">{emailError}</div>
      )}

      <div className="contact-card-container">
        <ContactCard
          name={name}
          email={email}
          content={content}
          onNameChange={setName}
          onEmailChange={setEmail}
          onContentChange={setContent}
          onSubmit={handleSubmit} // Truyền handleSubmit vào ContactCard
          isLoading={isLoading || isUserLoading} // Disable button khi đang gửi thông tin hoặc đang tải dữ liệu người dùng
        />
      </div>
    </div>
  );
};

export default ContactPage;
