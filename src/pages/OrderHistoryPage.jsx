import React, { useState, useEffect, useRef } from "react";
import Order from "../components/OrderComponent";
import '../css/pages/orderHistory.css';
import { useGetAllOrderByUserQuery, useHandlePaymentCallbackMutation } from "../apis/orderApi";
import PaginationComponent from "../components/PaginationComponent";
import { useLocation } from "react-router-dom";
import { useUpdateOrderStatusMutation } from "../apis/orderApi";  // Import mutation để cập nhật trạng thái đơn hàng

const OrderHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [callbackCompleted, setCallbackCompleted] = useState(false);
    const [handlePaymentCallback] = useHandlePaymentCallbackMutation();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    // Không query cho đến khi callback hoàn thành (nếu có callback)
    const shouldFetch = !localStorage.getItem('orderCode') || callbackCompleted;
    
    const { data, isLoading, error, refetch } = useGetAllOrderByUserQuery(
        { page: currentPage, limit: 5 },
        { skip: !shouldFetch }
    );

    const location = useLocation();

    useEffect(() => {
        const orderCode = localStorage.getItem('orderCode');
        
        if (orderCode) {
            const processCallback = async () => {
                try {
                    await handlePaymentCallback({ orderCode }).unwrap();
                    localStorage.removeItem('orderCode');
                    setCallbackCompleted(true);
                } catch (error) {
                    console.error("Error processing payment:", error);
                    localStorage.removeItem('orderCode');
                    setCallbackCompleted(true);
                }
            };

            processCallback();
        } else {
            // Nếu không có orderCode, đánh dấu là đã hoàn thành
            setCallbackCompleted(true);
        }
    }, [handlePaymentCallback]);

    // Effect riêng để refetch khi callback hoàn thành
    useEffect(() => {
        if (callbackCompleted) {
            refetch();
        }
    }, [callbackCompleted, refetch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleCancelOrder = async (orderId) => {
        try {
            await updateOrderStatus({ id: orderId, status: "Cancelled" }).unwrap();
            await refetch();
        } catch (error) {
            console.error("Error while cancelling order:", error);
        }
    };

    // Loading state khi đang xử lý callback hoặc đang fetch data
    if (!callbackCompleted || isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const orderData = data?.data || [];
    const totalPages = data?.info?.totalPages;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-black">Lịch sử đơn hàng</h1>
            <div>
                <div className="mt-4 text-right text-sm text-gray-700 pr-48">
                    {totalPages > 0 && (
                        <p>Trang {currentPage} / {totalPages}</p>
                    )}
                </div>
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <div key={order.id} className="order-item">
                            <Order order={order} handleCancelOrder={handleCancelOrder} />
                        </div>
                    ))
                ) : (
                    <div className="h-[80vh]">
                        <p className="flex justify-center">Chưa có đơn hàng</p>
                    </div>
                )}
            </div>
            {orderData?.length > 0 && (
                <div className="flex justify-center m-4">
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
