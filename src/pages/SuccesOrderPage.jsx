import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../apis/orderApi';
import { useDispatch } from 'react-redux';
import { useRemoveItemFromCartMutation } from '../apis/cartApi'; // Giả định bạn có một API xóa

const SuccessOrderPage = () => {
    const navigate = useNavigate();
    const [createOrder] = useCreateOrderMutation();
    const [removeFromCartApi] = useRemoveItemFromCartMutation(); // Hook để gọi API xóa
    const [orderInfo, setOrderInfo] = useState(null);
    const hasRun = useRef(false); // Khởi tạo useRef

    useEffect(() => {
        const handleCreateOrder = async () => {
            try {
                // Lấy thông tin đơn hàng từ localStorage
                const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
                console.log(storedOrderData);
                if (storedOrderData) {
                    // Gọi API để lưu đơn hàng
                    const response = await createOrder(storedOrderData).unwrap();
                    if (response.data) {
                        // Gọi API để xóa từng mục đã đặt hàng khỏi giỏ hàng
                        await Promise.all(storedOrderData.items.map(async (item) => {
                            await removeFromCartApi(item.menuItem).unwrap(); // Gọi API để xóa
                        }));
                    }
                    localStorage.removeItem('orderData'); // Xóa dữ liệu đã lưu sau khi sử dụng
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        // Kiểm tra xem handleCreateOrder đã chạy chưa
        if (!hasRun.current) {
            handleCreateOrder();
            hasRun.current = true; // Đánh dấu đã chạy
        }
    }, [createOrder, removeFromCartApi]); // Cập nhật dependency array

    return (
        <div>
            <h2>Order Successful!</h2>
            {orderInfo ? (
                <div>
                    <p><strong>Order Code:</strong> {orderInfo.orderCode}</p>
                    <p><strong>Total Amount:</strong> {orderInfo.totalAmount.toLocaleString('vi-VN')}đ</p>
                    <p><strong>Status:</strong> {orderInfo.status}</p>
                    <p><strong>Payment Method:</strong> {orderInfo.paymentMethod}</p>
                    <p><strong>Delivery Address:</strong> {orderInfo.deliveryAddress}</p>
                    <h3>Items:</h3>
                    <ul>
                        {orderInfo.items.map((item) => (
                            <li key={item.menuItem}>
                                {item.quantity} x {item.menuItem} - {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Creating your order...</p>
            )}
            <button onClick={() => navigate('/orders')}>View My Orders</button>
        </div>
    );
};

export default SuccessOrderPage;
