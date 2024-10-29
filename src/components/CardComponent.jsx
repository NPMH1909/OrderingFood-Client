import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useAddItemToCartMutation } from '../apis/cartApi'; // Điều chỉnh đường dẫn nếu cần

const CardComponent = ({ id, name, image, description, price }) => {
  const [addToCart, { isLoading }] = useAddItemToCartMutation(); // Sử dụng hook mutation

  const handleAddToCart = async () => {
    try {
      console.log('product', id)
      await addToCart( { productId: id, quantity: 1 }).unwrap(); // Gọi mutation và đợi kết quả
      // Có thể thêm thông báo thành công ở đây
    } catch (error) {
      console.error('Failed to add to cart: ', error);
      // Xử lý lỗi ở đây nếu cần
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
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          disabled={isLoading} // Vô hiệu hóa nút khi đang thêm vào giỏ
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
