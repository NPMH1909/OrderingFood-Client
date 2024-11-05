import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { SideBar } from '../components/SideBar';
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import UserInfoCard from '../components/UserInfoCard';
import DishManageForm from '../components/DishManageForm';
import OrderManage from '../components/OrderManage';
import Menu from '../components/Menu';
const admin_sidebar = [
  {
    title: {
      label: "Quản lý",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Menu", elements: <Menu /> },
      { label: "Đơn hàng", elements: <OrderManage /> },
    ],
  },
];
const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState(<Menu />);

  return (
    <>
      <AdminNavbar />

      <div className="flex">

        {/* Cố định Sidebar */}
        <div className="fixed  h-full w-1/5 bg-gray-800">
          <SideBar sidebarData={admin_sidebar} setActiveComponent={setActiveComponent} />
        </div>

        {/* Phần nội dung chính sẽ nằm cạnh SideBar */}
        <div className="ml-[20%] w-4/5">
          <div className="p-4">{activeComponent}</div>
        </div>
      </div>
    </>
  );
};


export default AdminPage;
