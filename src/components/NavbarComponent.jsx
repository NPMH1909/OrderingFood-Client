import React from "react";
import {
    Typography,
    Button,
    List,
    ListItem,
} from "@material-tailwind/react";
import {
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const navigate = useNavigate()
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
                            onClick={()=>{navigate('/')}}
                        >
                            <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
                        </Typography>
                        <Typography
                            as="a"
                            href="#"
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                            onClick={()=>{navigate('/product')}}
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
                    <Button variant="text" size="sm" color="blue-gray" onClick={()=>{navigate('/cart')}}>
                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    </Button>
                    <Button variant="gradient" size="sm">
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
