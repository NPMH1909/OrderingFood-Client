import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useAddItemToCartMutation, useRemoveItemFromCartMutation } from '../apis/cartApi';

const CartItemComponent = ({ item, onQuantityChange, onCheckChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isChecked, setIsChecked] = useState(false);
  const [addItemToCart] = useAddItemToCartMutation();
  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const isProductAvailable = item.isAvailable; // Kiểm tra trạng thái có sẵn của sản phẩm

  const handleDecrease = async () => {
    if (quantity > 1 && isProductAvailable) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await addItemToCart({ productId: item.item, quantity: -1 }).unwrap();
      onQuantityChange(item, newQuantity); // Gửi số lượng mới lên CartPage
    }
  };

  const handleIncrease = async () => {
    if (isProductAvailable) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      await addItemToCart({ productId: item.item, quantity: 1 }).unwrap();
      onQuantityChange(item, newQuantity); // Gửi số lượng mới lên CartPage
    }
  };

  const handleRemove = async () => {
    await removeItemFromCart(item.item).unwrap();
  
    // Gọi callback để cập nhật lại trạng thái `selectedItems` từ `CartPage`
    onCheckChange(item, false); // Xóa item khỏi `selectedItems` nếu nó đang được chọn
  };
  
  

  const handleCheck = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onCheckChange(item, checked);
  };

  return (
    <div className="col-span-2 bg-white p-4 shadow-md rounded">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          disabled={!isProductAvailable} // Disable checkbox nếu sản phẩm không còn có sẵn
        />
        <img src={item.imageUrl} alt="product" className="w-24 h-24 object-cover rounded" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <h3 className="text-lg font-semibold">Đơn giá: {item.price.toLocaleString('vi-VN')} VND</h3>
          <p className="text-sm text-green-600">{item.isAvailable ? 'Còn hàng' : 'Hết hàng'}</p>
        </div>
        <div className="flex-1 text-right">
          <div className="flex items-center">
            <button
              onClick={handleDecrease}
              className="px-2 border border-gray-300 rounded-l hover:bg-gray-200"
              disabled={!isProductAvailable} // Disable nút giảm nếu sản phẩm không còn có sẵn
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="border border-gray-300 text-center w-12"
              disabled={!isProductAvailable} // Disable ô nhập số lượng nếu sản phẩm không còn có sẵn
            />
            <button
              onClick={handleIncrease}
              className="px-2 border border-gray-300 rounded-r hover:bg-gray-200"
              disabled={!isProductAvailable} // Disable nút tăng nếu sản phẩm không còn có sẵn
            >
              +
            </button>
          </div>
          <p className="text-lg font-semibold mt-2">{(item.price * quantity).toLocaleString('vi-VN')}đ</p>
        </div>
        <button
          onClick={handleRemove}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
