import React, { useState, useEffect } from "react";
import { Button, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";

const EditUserForm = ({ userInfo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        address: userInfo.address || "",
        phoneNumber: userInfo.phoneNumber || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData); // Gọi hàm onSave với dữ liệu form
  };

  return (
    <div className="modal-overlay">
        <div className="modal-content">
      <DialogHeader>
        <Typography variant="h4" color="blue-gray">
          Thông tin người dùng
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Tên người dùng
          </Typography>
          <Input
            color="gray"
            size="lg"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tên"
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Địa chỉ
          </Typography>
          <Input
            color="gray"
            size="lg"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Số điện thoại
          </Typography>
          <Input
            color="gray"
            size="lg"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
        </div>
      </DialogBody>
      <DialogFooter className="gap-4">
        <Button className="ml-auto" onClick={handleSave}>
          Lưu
        </Button>
        <Button onClick={onClose}>Hủy</Button>
      </DialogFooter>
    </div>
    </div>
  );
};

export default EditUserForm;
