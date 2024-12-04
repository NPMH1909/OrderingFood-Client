import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useAddItemToCartMutation } from '../apis/cartApi'; // Điều chỉnh đường dẫn nếu cần

const CardComponent = ({ id, name, image, description, price, isAvailable }) => {
  const [addToCart, { isLoading }] = useAddItemToCartMutation(); // Sử dụng hook mutation
  const [showNotification, setShowNotification] = useState(false); // State để quản lý hiển thị thông báo

  const handleAddToCart = async () => {
    try {
      if (!isAvailable) return; // Nếu hết hàng, không thực hiện thêm vào giỏ hàng
      await addToCart({ productId: id, quantity: 1 }).unwrap();
      setShowNotification(true); // Hiển thị thông báo
      setTimeout(() => {
        setShowNotification(false); // Ẩn thông báo sau 2 giây
      }, 2000);
    } catch (error) {
      console.error('Failed to add to cart: ', error);
    }
  };

  return (
    <Card className="mx-auto flex flex-col h-full">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img src={image} alt="card-image" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody className="flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium truncate w-2/3">{name}</Typography>
          <Typography color="blue-gray" className="font-medium w-1/3 text-right">{price.toLocaleString('vi-VN')}đ</Typography>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75 line-clamp-3">{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          ripple={false}
          fullWidth={true}
          className={`${
            isAvailable ? 'bg-blue-gray-900/10 text-blue-gray-900 hover:scale-105' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          } shadow-none hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}
          disabled={isLoading || !isAvailable} 
        >
          {isLoading ? 'Đang thêm...' : isAvailable ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
        </Button>
      </CardFooter>

      {/* Thông báo đã thêm vào giỏ hàng */}
      {showNotification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-md shadow-md">
          Đã thêm vào giỏ hàng!
        </div>
      )}
    </Card>
  );
};

export default CardComponent;
