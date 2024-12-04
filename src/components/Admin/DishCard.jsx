import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "../../css/components/DishCard_admin.css";

const DishCard = ({ dish, onEdit, onDelete }) => {
  return (
    <Card
      className="card-container"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <CardMedia
        component="img"
        image={dish.image.url}
        alt={dish.name}
        className="card-image"
        sx={{ height: 140, objectFit: "cover" }}
      />
      <CardContent className="card-content" sx={{ flexGrow: 1 }}>
        <Box className="card-title" sx={{ height: "30px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {dish.name}
          </Typography>
        </Box>
        <Box className="card-category" sx={{ height: "30px" }}>
          <Typography
            variant="body2"
            color="textSecondary"
            className="category-text"
          >
            Loại: {dish.category}
          </Typography>
        </Box>
        <Box className="card-description" sx={{ height: "40px" }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            Mô tả: {dish.description}
          </Typography>
        </Box>
        <Box className="card-price" sx={{ height: "30px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Giá: {dish.price.toLocaleString('vi-VN')} VND
          </Typography>
        </Box>
        <Box className="card-quantity" sx={{ height: "30px" }}>
          <Typography variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}>
            Trạng thái: {dish?.isAvailable ? "Còn hàng" : "Hết hàng"}
          </Typography>
        </Box>
        <Box className="card-price" sx={{ height: "30px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Đã bán: {dish.soldQuantity.toLocaleString('vi-VN')}
          </Typography>
        </Box>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onEdit(dish)}
        >
          Cập nhật
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => onDelete(dish.id)}
        >
          Xóa
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;
