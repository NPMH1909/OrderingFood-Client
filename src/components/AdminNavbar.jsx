import React from "react";
import {
  Navbar,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars2Icon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import "../css/pages/DishManageForm.css"
const AdminNavbar = () => {
  const navigate = useNavigate(); // Hook để chuyển hướng trang


  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setIsNavOpen(false);
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
