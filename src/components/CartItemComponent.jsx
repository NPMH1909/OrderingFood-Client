import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

export const CartItemComponent = ({ item, onSelect }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isSelected, setIsSelected] = useState(false);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleSelect = (e) => {
    setIsSelected(e.target.checked);
    onSelect(item.id, e.target.checked);
  };

  return (
    <div className="col-span-2 bg-white p-4 shadow-md rounded">
      <div className="flex items-center space-x-4">
        <input type="checkbox" checked={isSelected} onChange={handleSelect} />
        <img src={item.image} alt="product" className="w-24 h-24 object-cover rounded" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')}đ</p>
          <p className="text-sm text-green-600">In Stock</p>
        </div>
        <div className="flex-1 text-right">
          <div className="flex items-center">
            <button onClick={handleDecrease} className="px-2 border border-gray-300 rounded-l hover:bg-gray-200">-</button>
            <input type="number" value={quantity} readOnly className="border border-gray-300 text-center w-12" />
            <button onClick={handleIncrease} className="px-2 border border-gray-300 rounded-r hover:bg-gray-200">+</button>
          </div>
          <p className="text-lg font-semibold mt-2">{(item.price * quantity).toLocaleString('vi-VN')}đ</p>
        </div>
        <button onClick={handleRemove} className="ml-4 text-red-500 hover:text-red-700">
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
