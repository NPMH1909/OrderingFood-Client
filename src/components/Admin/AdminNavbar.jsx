import React, { useState, useEffect } from "react"; 
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import "../../css/pages/DishManageForm.css";

const AdminNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsNavOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/loginAD");
  };

  return (
    <Navbar className="mx-auto max-w-screen-3xl rounded-none px-4 py-2 sticky top-0 z-50">
      <AppBar position="static" className="admin-header" sx={{ bgcolor: "#B43f3f" }}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            QUẢN LÍ CỬA HÀNG
          </Typography>
          <Button color="gray" onClick={handleLogout} className="ml-auto">
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>
    </Navbar>
  );
};

export default AdminNavbar;
