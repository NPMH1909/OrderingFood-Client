import React, { useState, useEffect, useRef } from "react";
import Order from "../components/OrderComponent";
import '../css/pages/orderHistory.css';
import { useGetAllOrderByUserQuery } from "../apis/orderApi";
import PaginationComponent from "../components/PaginationComponent";
import { useCreateOrderMutation } from '../apis/orderApi';
import { useRemoveItemFromCartMutation } from '../apis/cartApi'; 
const OrderHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [createOrder] = useCreateOrderMutation();
    const [removeFromCartApi] = useRemoveItemFromCartMutation(); 
    const hasRun = useRef(false); 
    const { data, isLoading, error, refetch } = useGetAllOrderByUserQuery({ page: currentPage, limit: 5 });

    useEffect(() => {
        const handleCreateOrder = async () => {
            try {
                const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
                console.log(storedOrderData);
                if (storedOrderData) {
                    const response = await createOrder(storedOrderData).unwrap();
                    if (response.data) {
                        await Promise.all(storedOrderData.items.map(async (item) => {
                            await removeFromCartApi(item.menuItem).unwrap(); 
                        }));
                    }
                    localStorage.removeItem('orderData'); 
                    refetch()
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (!hasRun.current) {
            handleCreateOrder();
            hasRun.current = true; 
        }
    }, [createOrder, removeFromCartApi, refetch]);

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const orderData = data?.data || [];
    const totalPages = data?.info?.totalPages;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-black">Lịch sử đơn hàng</h1>
            <div>
                <div className="mt-4 text-right text-sm text-gray-700 pr-48">
                    {totalPages>0 && (
                        <p>Trang {currentPage} / {totalPages}</p>
                    )}
                </div>
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <Order key={order.id} order={order} />
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