import React, { useState, useEffect } from "react"; // Thêm useEffect
import {
    Typography,
    Button,
    List,
    ListItem,
    MenuItem,
} from "@material-tailwind/react";
import {
    ShoppingCartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice'; 
import { clearUserInfo } from '../slices/userSlice'; 

const NavbarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái để điều khiển menu

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        dispatch(clearUserInfo());
        navigate('/');
    };

    // Xử lý sự kiện click bên ngoài menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('user-menu');
            if (menu && !menu.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        // Cleanup event listener khi component unmount hoặc khi isMenuOpen thay đổi
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Hàm xử lý khi nhấn vào biểu tượng giỏ hàng
    const handleCartClick = () => {
        if (userInfo) {
            navigate('/cart'); // Nếu đã đăng nhập, chuyển đến trang giỏ hàng
        } else {
            navigate('/login'); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
        }
    };

    return (
        <div className="mx-auto w-full px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h4"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    Material Tailwind
                </Typography>
                <div className="hidden lg:block">
                    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-8">
                        <Typography
                            as="a"
                            href="#"
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                            onClick={() => { navigate('/') }}
                        >
                            <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
                        </Typography>
                        <Typography
                            as="a"
                            href="#"
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                            onClick={() => { navigate('/product') }}
                        >
                            <ListItem className="flex items-center gap-2 py-2 pr-4">Product</ListItem>
                        </Typography>
                        <Typography
                            as="a"
                            href="#"
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                        >
                            <ListItem className="flex items-center gap-2 py-2 pr-4">About Us</ListItem>
                        </Typography>
                        <Typography
                            as="a"
                            href="#"
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                        >
                            <ListItem className="flex items-center gap-2 py-2 pr-4">Contact Us</ListItem>
                        </Typography>
                    </List>
                </div>
                <div className="hidden gap-2 lg:flex">
                    <Button variant="text" size="sm" color="blue-gray" onClick={handleCartClick}>
                        <ShoppingCartIcon className="w-6 h-6 mr-2" />
                    </Button>
                    {userInfo ? (
                        <div className="relative" id="user-menu">
                            <Button
                                variant="gradient"
                                size="sm"
                                color="white"
                                onClick={() => setIsMenuOpen((prev) => !prev)} // Toggle menu
                            >
                                <UserCircleIcon className="w-8 h-8 mr-4" />
                            </Button>
                            {isMenuOpen && ( // Hiển thị menu nếu isMenuOpen là true
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <MenuItem onClick={() => navigate('/profile')}>
                                        Thông tin người dùng
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/history')}>
                                        Lịch sử đặt hàng
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Đăng xuất
                                    </MenuItem>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button variant="gradient" size="sm" onClick={() => { navigate('/login') }}>
                            Sign In
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
