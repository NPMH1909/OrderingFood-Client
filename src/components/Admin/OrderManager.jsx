import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tooltip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
} from "@material-tailwind/react";
import { useGetAllOrderQuery, useUpdateOrderStatusMutation } from "../../apis/orderApi";
import PaginationComponent from "../PaginationComponent";
import { format } from 'date-fns';

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Delivery", value: "Delivery" },
  { label: "Success", value: "Success" },
];

const OrderManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error, refetch } = useGetAllOrderQuery({
    page: currentPage,
    limit,
    status: statusFilter !== "all" ? statusFilter : undefined,
    email: searchQuery || undefined,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data && !isLoading) {
      setOrders(data.data.orders);
    }
  }, [data, isLoading]);
  useEffect(() => {
    window.scrollTo(0, 0);
}, [currentPage]);
  useEffect(() => {
    refetch();
  }, [statusFilter, currentPage, searchQuery, refetch]);

  const handleTabChange = (newTabValue) => {
    setStatusFilter(newTabValue);
    setCurrentPage(1);
  };

  const handleUpdateStatus = async (order, event) => {
    event.stopPropagation();
    let newStatus = order.status === "Pending" ? "Delivery" : "Success";
    if (order.status === "Success") return;

    try {
      await updateOrderStatus({ id: order._id, status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === order._id ? { ...o, status: newStatus } : o
        )
      );
      console.log(`Cập nhật đơn hàng ${order._id} sang trạng thái ${newStatus}`);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
  };
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <p className="text-2xl font-semibold text-black">QUẢN LÝ ĐƠN HÀNG</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs className="w-full md:w-max flex gap-4">
              <TabsHeader className="flex space-x-2">
                {TABS.map(({ label, value }, index) => (
                  <div
                    key={value}
                    onClick={() => handleTabChange(value)}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${statusFilter === value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-blue-gray-700 hover:bg-blue-200"
                      } ${index < TABS.length - 1 ? "border-r-2 border-gray-300" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </TabsHeader>
            </Tabs>

            <div className="w-full md:w-72">
              <Input
                label="Search by Email"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          {orders?.length === 0 ? (
            <Typography variant="h6" color="blue-gray" className="text-center mt-4">
              Không có đơn hàng
            </Typography>
          ) : (
            <table className="mt-4 w-full min-w-max table-auto text-left border-collapse">
              <thead className="border-y-2 border-gray-300">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-300">Customer</th>
                  <th className="px-4 py-2 border-r border-gray-300">Total</th>
                  <th className="px-4 py-2 border-r border-gray-300">Created at</th>
                  <th className="px-4 py-2 border-r border-gray-300">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-r border-gray-300">{order.user.name}</td>
                    <td className="px-4 py-2 border-b border-r border-gray-300">
                      {formatAmount(order.totalAmount)} VND
                    </td>
                    <td className="px-4 py-2 border-b border-r border-gray-300">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-4 py-2 border-b border-r border-gray-300">{order.status}</td>
                    <td className="px-4 py-2 border-b flex gap-4">
                      <Button onClick={() => handleViewDetails(order)} size="sm" variant="outlined">
                        View Details
                      </Button>
                      <Button
                        onClick={(event) => handleUpdateStatus(order, event)}
                        disabled={order.status === "Success"}
                        size="sm"
                        variant="outlined"
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className='flex justify-center m-4'>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={data?.data?.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardFooter>
      </Card>

      <Dialog open={openModal} onClose={closeModal}>
        <div className="p-4">
          <Typography className="flex justify-center font-semibold text-2xl">
            Order Details
          </Typography>
          {selectedOrder && (
            <div className="m-4">
              <div className="flex mb-1">
                <p className="font-semibold mr-2 ">Customer:</p>
                <p>{selectedOrder.user.name}</p>
              </div>

              <div className="flex mb-1">
                <p className="font-semibold mr-2">Email:</p>
                <p>{selectedOrder.user.email}</p>
              </div>

              <div className="flex mb-1">
                <p className="font-semibold mr-2">Delivery Address:</p>
                <p>{selectedOrder.deliveryAddress}</p>
              </div>

              <div className="flex mb-1">
                <p className="font-semibold mr-2">Created At:</p>
                <p>{formatDate(selectedOrder.createdAt)}</p>
              </div>

              <div className="flex mb-1">
                <p className="font-semibold mr-2">Status:</p>
                <p>{selectedOrder.status}</p>
              </div>

              <p className="font-semibold mr-2">Order Items:</p>
              <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border border-gray-300 text-left">Item</th>
                    <th className="px-4 py-2 border border-gray-300 text-center">Quantity</th>
                    <th className="px-4 py-2 border border-gray-300 text-right">Price(VND)</th>
                    <th className="px-4 py-2 border border-gray-300 text-right">Total(VND)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">{item.menuItem.name}</td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-right">
                        {item.menuItem.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-right">
                        {(item.menuItem.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300 text-right" colSpan="3">
                      Total Amount:
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-right">
                      {selectedOrder.totalAmount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-end p-4">
          <Button
            onClick={closeModal}
            variant="outlined"
            color="blue"
            className="ml-auto"
          >
            Close
          </Button>
        </div>
      </Dialog>

    </>
  );
};

export default OrderManager;
