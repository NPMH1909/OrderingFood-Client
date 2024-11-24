import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation, useCreatePaymentOrderMutation } from '../apis/orderApi';
import { useRemoveItemFromCartMutation } from '../apis/cartApi';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCartItems, totalAmount } = location.state || {};
    const user = useSelector((state) => state.user.userInfo);

    const [fullName, setFullName] = useState(user?.name || '');
    const [address, setAddress] = useState(user?.address || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
    const [paymentMethod, setPaymentMethod] = useState('Online');
    const [removeFromCartApi] = useRemoveItemFromCartMutation(); 

    const [errorMessage, setErrorMessage] = useState('');
    const [createOrder, isLoading] = useCreateOrderMutation();

    const handleCreatePaymentOrderLink = async () => {
        // Kiểm tra thông tin đã đầy đủ chưa
        if (!fullName || !address || !phoneNumber) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin (Tên, Địa chỉ, Số điện thoại)');
            return;
        }
        try {
            const orderDataToStore = {
                user: user._id,
                items: selectedCartItems.map(item => ({
                    menuItem: item.item,
                    quantity: item.quantity,
                })),
                totalAmount: totalAmount,
                paymentMethod: paymentMethod,
                deliveryAddress: address,
            };
            console.log('payment', paymentMethod)
            if (paymentMethod === 'Online') {
                const message = await createOrder(orderDataToStore).unwrap();
                const orderCode =  message.data.orderCode
                localStorage.setItem('orderCode', orderCode);

                if (message.data) {
                    await Promise.all(orderDataToStore.items.map(async (item) => {
                        await removeFromCartApi(item.menuItem).unwrap();
                    }));
                    window.location.replace(message.data.paymentLinkRes.checkoutUrl);
                } else {
                    navigate("/checkout?status=PAID&orderCode=" + message.data.orderCode);
                }
            } else {
                const message = await createOrder(orderDataToStore).unwrap();
                if (message.data) {
                    await Promise.all(orderDataToStore.items.map(async (item) => {
                        await removeFromCartApi(item.menuItem).unwrap();
                    }));
                    navigate('/order/history')
                }
               
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
                                        <p className="text-gray-600 text-sm">Số lượng: {item.quantity}</p>
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
                        <div>
                            <label className="flex justify-between font-semibold text-lg">Phương thức thanh toán *</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 mt-1"
                            >
                                <option value="Online">Thanh toán Online</option>
                                <option value="Cash">Thanh toán khi nhận hàng</option>
                            </select>
                        </div>
                        <button className="w-full bg-black text-white py-2 mt-4 rounded" onClick={handleCreatePaymentOrderLink}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
