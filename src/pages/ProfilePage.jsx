import React, { useState } from "react";
import UserInfoCard from "../components/UserInfoCard";
import EditUserForm from "../components/EditInfoForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import dishImage from "../assets/images/dishes_2.png";
import { useChangePasswordMutation, useGetUserByIdQuery, useUpdateUserMutation } from "../apis/userApi";
import "../css/pages/UserInfoForm.css"
const ProfilePage = () => {
  const { data, isLoading, error } = useGetUserByIdQuery();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userInfo = data.data;

  const handleEdit = () => {
    setIsEditModalOpen(true); 
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true); 
  };

  const handleSaveUserInfo = async (formData) => {
    try {
      await updateUser({ id: userInfo.id, data: formData }).unwrap();
      setIsEditModalOpen(false);
      console.log("User info updated successfully");
    } catch (updateError) {
      console.error("Error updating user info:", updateError);
    }
  };

  const handleSavePassword = async (passwordData) => {
    try {
      await changePassword({ id: userInfo.id, data: passwordData }).unwrap();
      setIsPasswordModalOpen(false); 
      console.log("Changed password successfully");
    } catch (updateError) {
      console.error("Error updating user info:", updateError);
    }
  };

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
            phone={userInfo.phoneNumber}
            username={userInfo.username}
            onEdit={handleEdit}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <EditUserForm
          userInfo={userInfo}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveUserInfo}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordForm
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={handleSavePassword}
        />
      )}
    </div>
  );
};

export default ProfilePage;
