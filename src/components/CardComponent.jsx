import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from 'react'

const CardComponent = ({ name, image, description, price }) => {
  return (
    <Card className="mx-auto flex flex-col h-full">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex-grow">
        {/* Sử dụng flex để giữ name và price cùng dòng */}
        <div className="mb-2 flex items-center justify-between">
          {/* Giới hạn chiều rộng của tên để không bị tràn và gây đẩy giá xuống */}
          <Typography color="blue-gray" className="font-medium truncate w-2/3">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium w-1/3 text-right">
            ${price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 line-clamp-3"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-auto">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
