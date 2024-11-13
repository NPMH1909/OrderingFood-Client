import React, { useState } from 'react';
import AdminNavbar from '../components/Admin/AdminNavbar';
import { SideBar } from '../components/Admin/SideBar';
import {
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import MembersTable from '../components/Admin/OrderManager';
import Menu from '../components/Admin/Menu';
import Revenue from '../components/Admin/Revenue';

const admin_sidebar = [
    {
        title: {
            label: "Quản lý",
            icon: <Cog6ToothIcon className="h-5 w-5" />,
        },
        sublist: [
            { label: "Menu", elements: <Menu /> },
            { label: "Đơn hàng", elements: <MembersTable /> },
            { label: "Doanh thu", elements: <Revenue/> },
        ],
    },
];

const AdminPage = () => {
    const [activeComponent, setActiveComponent] = useState(<Menu />);
    const [activeIndex, setActiveIndex] = useState(0); // Thêm trạng thái để lưu chỉ số active

    return (
        <>
            <AdminNavbar />
            <div className="flex">
                <div className="fixed h-full w-1/5 bg-gray-800">
                    <SideBar 
                        sidebarData={admin_sidebar} 
                        setActiveComponent={setActiveComponent} 
                        activeIndex={activeIndex} // Truyền chỉ số active vào
                        setActiveIndex={setActiveIndex} // Truyền hàm để cập nhật chỉ số active
                    />
                </div>
                <div className="ml-[20%] w-4/5">
                    <div className="p-4">{activeComponent}</div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
