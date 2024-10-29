import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavbarComponent from '../components/NavbarComponent';
import { CartItemComponent } from '../components/CartItemComponent';
import FooterComponent from '../components/FooterComponent';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedItems, setSelectedItems] = useState({});
  const [showModal, setShowModal] = useState(false); // State để quản lý modal
  const navigate = useNavigate();
  

  const handleSelectItem = (id, isSelected) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [id]: isSelected,
    }));
  };

  const selectedCartItems = cartItems.filter(item => selectedItems[item.id]);
  const totalAmount = selectedCartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    // Kiểm tra xem có item nào được chọn hay không
    if (selectedCartItems.length === 0) {
      setShowModal(true); // Hiển thị modal nếu chưa chọn item nào
    } else {
      // Chuyển hướng tới CheckoutPage với state chứa danh sách item đã chọn và tổng tiền
      navigate('/checkout', {
        state: { selectedCartItems, totalAmount }
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng modal
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <NavbarComponent />
        <hr className="border border-black" />
        <main className="container mx-auto my-8">
          <h2 className="text-2xl font-bold mb-6">My Cart</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItemComponent
                    key={index}
                    item={item}
                    onSelect={handleSelectItem}
                  />
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="bg-white p-4 shadow-md rounded sticky top-0 h-fit">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="text-sm text-gray-700">
                <p className="flex justify-between">Shipping cost <span>TBD</span></p>
                <p className="flex justify-between">Discount <span>-$0</span></p>
                <p className="flex justify-between">Tax <span>TBD</span></p>
                <hr className="my-2" />
                <p className="flex justify-between font-semibold">Estimated Total <span>{totalAmount.toLocaleString('vi-VN')}đ</span></p>
              </div>
              <button className="w-full bg-black text-white py-2 mt-4 rounded" onClick={handleCheckout}>Checkout</button>
              <p className="text-sm text-center text-red-500 mt-2">You're $10.01 away from free shipping!</p>
            </div>
          </div>
        </main>
      </div>
      <FooterComponent />

      {/* Modal thông báo */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Thông báo</h3>
            <p className="mt-2">Bạn chưa chọn item nào. Vui lòng chọn ít nhất một item để tiếp tục.</p>
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={handleCloseModal}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
