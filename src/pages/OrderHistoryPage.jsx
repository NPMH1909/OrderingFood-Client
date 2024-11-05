import React from "react";
import Order from "../components/OrderComponent";
import '../css/pages/orderHistory.css';
import { useGetAllOrderByUserQuery } from "../apis/orderApi";

const OrderHistory = () => {
    const { data, isLoading, error } = useGetAllOrderByUserQuery({ page: 1, limit: 5 });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const orderData = data?.data || [];

    return (
        <div className="h-[100vh]">
            <h1>Order History</h1>
            {orderData.length > 0 ? (
                orderData.map((data) => (
                    <Order key={data.id} order={data} />
                ))
            ) : (
                <p>Chưa có đơn hàng</p>
            )}
        </div>
    );
}

export default OrderHistory;
