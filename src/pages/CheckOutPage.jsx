import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreatePaymentOrderMutation } from '../apis/orderApi';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCartItems, totalAmount } = location.state || {};
    const user = useSelector((state) => state.user.userInfo);

    const [fullName, setFullName] = useState(user?.name || '');
    const [address, setAddress] = useState(user?.address || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
    
    const [errorMessage, setErrorMessage] = useState('');
    const [createPaymentOrder, { isLoading: isCreatingPayment }] = useCreatePaymentOrderMutation();

    const handleCreatePaymentOrderLink = async () => {
        // Kiểm tra thông tin đã đầy đủ chưa
        if (!fullName || !address || !phoneNumber) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin (Tên, Địa chỉ, Số điện thoại)');
            return; // Dừng lại không cho phép tạo đơn hàng
        }
        
        try {
            const orderCode = Number(String(new Date().getTime()).slice(-6));
            const orderDataToStore = {
                user: user._id,
                items: selectedCartItems.map(item => ({
                    menuItem: item.item,
                    quantity: item.quantity,
                })),
                totalAmount: totalAmount,
                status: 'Pending',
                paymentMethod: 'Credit Card',
                deliveryAddress: address,
                orderCode: orderCode,
            };
            localStorage.setItem('orderData', JSON.stringify(orderDataToStore));
            const message = await createPaymentOrder({ totalAmount, orderCode }).unwrap();
            if (message.data) {
                window.location.replace(message.data.checkoutUrl);
            } else {
                navigate("/checkout?status=PAID&orderCode=" + message.data.orderCode);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div>
                <span className='text-blue-500 ml-20 cursor-pointer hover:underline' onClick={() => navigate('/cart')}>
                    Giỏ hàng
                </span>
                <span className='text-blue-500 mx-2'>&gt;</span>
                <span className='text-blue-500 cursor-pointer'>Đặt hàng</span>
            </div>
            <div className="flex justify-center min-h-screen bg-gray-100 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">ĐƠN HÀNG</h2>
                        <h3 className="text-lg font-semibold mb-4">Thông tin người dùng</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Họ tên *</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Địa chỉ *</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Số điện thoại *</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    required
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm mt-4">
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h3>
                        <div className="space-y-4 mb-4">
                            {selectedCartItems && selectedCartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between">
                                    <img src={item.imageUrl} alt="Product" className="w-16 h-16 rounded" />
                                    <div className="flex-1 ml-4">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-gray-600 text-sm">{item.quantity}x</p>
                                    </div>
                                    <p className="font-semibold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                            {/* <div className="flex justify-between"><span>Subtotal</span><span>{totalAmount.toLocaleString('vi-VN')}đ</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span>TBD</span></div>
                            <div className="flex justify-between"><span>Discount</span><span>-TBD</span></div> */}
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Tổng tiền</span><span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-2 mt-4 rounded" onClick={handleCreatePaymentOrderLink}>
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
