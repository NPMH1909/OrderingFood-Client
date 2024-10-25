import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple Juice',
      volume: '250ml',
      price: 2.99,
      image: 'https://i.pinimg.com/474x/89/d7/4c/89d74c79efa930991ccfd27555268e72.jpg', // URL ảnh
      quantity: 2,
    },
    {
      id: 2,
      name: 'Grapes Juice',
      volume: '250ml',
      price: 3.19,
      image: 'https://i.pinimg.com/564x/a2/73/a8/a273a8e3d61d4bab26573368f7181b9c.jpg', // URL ảnh
      quantity: 1,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
    <NavbarComponent/>
    <hr className="border border-black" />

    <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
    <div className="p-4 bg-blue-50 rounded-lg w-1/2 ml-8">
      
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
          <div className="flex-1 ml-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.volume}</p>
            <span className="text-green-500 text-sm">In Stock</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="text-xl font-bold px-2"
            >
              -
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="text-xl font-bold px-2"
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
            <div className="flex text-sm">
              <button className="text-blue-500 mr-2">Save for later</button>
              <button
                className="text-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Sub-Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
          Checkout
        </button> */}
      </div>
    </div>
    </>
  );
 
};

export default CartPage;
