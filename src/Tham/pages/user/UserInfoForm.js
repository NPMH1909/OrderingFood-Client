// src/components/UserInfoForm.js
import React from "react";
import UserInfoCard from "../../components/UserInfoCard.js";
import "../../styles/pages/UserInfoForm.css"; // Đường dẫn đến file CSS của UserInfoFormFormstyles/components/UserInfoForm.css"; // Đường dẫn đến file CSS của UserInfoForm
import dishImage from "../../assets/images/dishes_2.png";

const UserInfoForm = () => {
  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "Hà Nội, Việt Nam",
    phone: "0123456789",
    username: "nguyenvana",
  };

  const handleEdit = () => {
    console.log("Chỉnh sửa thông tin");
  };
  //
  return (
    <div className="user-info-container">
      <div className="user-info-form">
        <img src={dishImage} alt="" className="dish-image" />
      </div>
      <div className="outer-card">
        <div className="user-info-card-container">
          <UserInfoCard
            name={userInfo.name}
            email={userInfo.email}
            address={userInfo.address}
            phone={userInfo.phone}
            username={userInfo.username}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
