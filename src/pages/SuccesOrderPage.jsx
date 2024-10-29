import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../apis/orderApi';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';

const SuccessOrderPage = () => {
    const navigate = useNavigate();
    const [createOrder] = useCreateOrderMutation();
    const [orderInfo, setOrderInfo] = useState(null);
    const hasRun = useRef(false); // Khởi tạo useRef
    const dispatch = useDispatch()
    useEffect(() => {
        const handleCreateOrder = async () => {
            try {
                // Lấy thông tin đơn hàng từ localStorage
                const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
                console.log(storedOrderData)
                if (storedOrderData) {
                    // Gọi API để lưu đơn hàng
                    const response = await createOrder(storedOrderData).unwrap();
                    if (response.data) {
                    console.log(response.data)
                        storedOrderData.items.forEach(item => {
                            dispatch(removeFromCart(item.menuItem));
                        });
                    }
                    
                    setOrderInfo(response.data); // Lưu thông tin đơn hàng vào state
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
    }, [createOrder]);

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
