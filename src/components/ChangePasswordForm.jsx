import React, { useState } from "react";
import { Button, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";

const ChangePasswordForm = ({ onClose, onSave }) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.retypeNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    onSave(passwordData); // Gọi hàm onSave với dữ liệu mật khẩu
  };

  return (
    <div className="modal-overlay">
        <div className="modal-content">
      <DialogHeader>
        <Typography variant="h4" color="blue-gray">
          Thay đổi mật khẩu
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Mật khẩu cũ
          </Typography>
          <Input
            color="gray"
            size="lg"
            type="password"
            name="password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            placeholder="Mật khẩu cũ"
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Mật khẩu mới
          </Typography>
          <Input
            color="gray"
            size="lg"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Mật khẩu mới"
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Nhập lại mật khẩu mới
          </Typography>
          <Input
            color="gray"
            size="lg"
            type="password"
            name="retypeNewPassword"
            value={passwordData.retypeNewPassword}
            onChange={handlePasswordChange}
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
      </DialogBody>
      <DialogFooter className="gap-4">
        <Button className="ml-auto" onClick={handlePasswordSave}>
          Đổi mật khẩu
        </Button>
        <Button onClick={onClose}>Hủy</Button>
      </DialogFooter>
    </div>
    </div>
  );
};

export default ChangePasswordForm;
