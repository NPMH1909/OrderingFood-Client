import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCartQuery } from '../apis/cartApi';
import CartItemComponent from '../components/CartItemComponent';

const CartPage = () => {
  const { data: cartItems, isLoading, isError } = useGetCartQuery();
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý modal
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal(selectedItems);
  }, [selectedItems]);

  const calculateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const handleItemCheck = (item, isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((selected) => selected.id !== item.id));
    }
  };

  const handleQuantityChange = (updatedItem, newQuantity) => {
    setSelectedItems((prevSelected) =>
      prevSelected.map((item) =>
        item.id === updatedItem.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setIsModalOpen(true); // Mở modal nếu chưa chọn sản phẩm
    } else {
      navigate('/checkout', { state: { selectedCartItems: selectedItems, totalAmount: total } });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart items.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-[80%] mx-auto my-8">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="col-span-2">
    {cartItems?.data?.items.length > 0 ? (
      cartItems.data.items.map((item, index) => (
        <CartItemComponent
          key={index}
          item={item}
          onQuantityChange={handleQuantityChange}
          onCheckChange={handleItemCheck}
        />
      ))
    ) : (
      <p>Your cart is empty.</p>
    )}
  </div>

  {/* Chỉ hiển thị phần Order Summary nếu giỏ hàng không trống */}
  {cartItems?.data?.items.length > 0 && (
    <div className="bg-white p-4 shadow-md rounded sticky top-20 h-fit">
      <h3 className="text-lg font-semibold mb-4">Đơn hàng</h3>
      <div className="text-sm text-gray-700">
        {/* <p className="flex justify-between">Shipping cost <span>TBD</span></p>
        <p className="flex justify-between">Discount <span>-$0</span></p>
        <p className="flex justify-between">Tax <span>TBD</span></p> */}
        <hr className="my-2" />
        <p className="flex justify-between font-semibold">Tổng tiền<span>{total.toLocaleString('vi-VN')}đ</span></p>
      </div>
      <button className="w-full bg-black text-white py-2 mt-4 rounded" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  )}
</div>

      </main>

      {/* Modal thông báo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Đóng modal
        message="Vui lòng chọn ít nhất một sản phẩm trước khi thanh toán."
      />
    </div>
  );
};

export default CartPage;
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Không hiển thị nếu modal chưa mở

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Thông báo</h2>
        <p className="text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
