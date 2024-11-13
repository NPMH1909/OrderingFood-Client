import React, { useState, useEffect } from "react"; // Import useState và useEffect
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import "../../css/pages/DishManageForm.css";

const AdminNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Khởi tạo state isNavOpen
  const navigate = useNavigate(); // Hook để chuyển hướng trang

  // Lắng nghe sự kiện thay đổi kích thước cửa sổ và đóng navigation khi kích thước lớn hơn 960px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsNavOpen(false); // Đóng navigation khi kích thước cửa sổ >= 960px
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginAD");
  };

  return (
    <Navbar className="mx-auto max-w-screen-3xl rounded-none px-4 py-2 sticky top-0 z-50">
      <AppBar position="static" className="admin-header" sx={{ bgcolor: "#B43f3f" }}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Restaurant Management Page
          </Typography>
          <Button color="gray" onClick={handleLogout} className="ml-auto">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Navbar>
  );
};

export default AdminNavbar;
