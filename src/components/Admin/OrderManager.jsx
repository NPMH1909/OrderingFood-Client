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

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Delivery", value: "Delivery" },
  { label: "Success", value: "Success" },
];

const MembersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  // State for status filter
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch orders based on status filter, current page, and limit
  const { data, isLoading, error, refetch } = useGetAllOrderQuery({
    currentPage,
    limit,
    status: statusFilter !== "all" ? statusFilter : undefined, // Only send status if it's not "all"
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
    // Trigger the API call again whenever statusFilter changes
    refetch();
  }, [statusFilter, currentPage, refetch]);

  const handleTabChange = (newTabValue) => {
    setStatusFilter(newTabValue); // Update the status filter when tab changes
    setCurrentPage(1); // Reset to the first page when changing the tab
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
                      ? "bg-blue-500 text-white" // Active tab style
                      : "bg-gray-100 text-blue-gray-700 hover:bg-blue-200" // Inactive tab style with hover effect
                      } ${index < TABS.length - 1 ? "border-r-2 border-gray-300" : ""}`} // Add vertical border between tabs
                  >
                    {label}
                  </div>
                ))}
              </TabsHeader>
            </Tabs>

            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
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
                    <td className="px-4 py-2 border-b border-r border-gray-300">{order.totalAmount}</td>
                    <td className="px-4 py-2 border-b border-r border-gray-300">{order.createdAt}</td>
                    <td className="px-4 py-2 border-b border-r border-gray-300">{order.status}</td>
                    <td className="px-4 py-2 border-b">
                      <Tooltip content="View Order Details">
                        <Button onClick={() => handleViewDetails(order)} size="sm" variant="outlined">
                          View Details
                        </Button>
                      </Tooltip>
                      <Tooltip content="Update Order Status">
                        <Button
                          onClick={(event) => handleUpdateStatus(order, event)}
                          disabled={order.status === "Success"}
                          size="sm"
                          variant="outlined"
                        >
                          Update
                        </Button>
                      </Tooltip>
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

      {/* Modal hiển thị thông tin đơn hàng */}
      <Dialog open={openModal} onClose={closeModal}>
        <div className="p-4">
          <Typography variant="h6" color="blue-gray">
            Order Details
          </Typography>
          {selectedOrder && (
            <>
              <p>Customer: {selectedOrder.user.name}</p>
              <p>Email: {selectedOrder.user.email}</p>
              <p>Total Amount: {selectedOrder.totalAmount}</p>
              <p>Delivery Address: {selectedOrder.deliveryAddress}</p>
              <p>Created At: {selectedOrder.createdAt}</p>
              <p>Status: {selectedOrder.status}</p>
              <p>Order Items:</p>
              <table className="w-full mt-2 table-auto">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <Button onClick={closeModal} variant="outlined" color="blue" className="mt-4">
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default MembersTable;
