import {
  Box, Button, Container, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, MenuItem, Snackbar, TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DishCard from './DishCard';
import { useAddItemMutation, useDeleteItemMutation, useGetItemByCategoryQuery, useGetMenuQuery, useUpdateItemMutation } from '../../apis/menuItemApi';
import SelectBoxComponent from '../SelectBoxComponent';
import SearchComponent from '../SearchComponent';
import PaginationComponent from '../PaginationComponent';

const categories = [
  "Đồ ăn Châu Âu",
  "Đồ ăn nướng",
  "Đồ ăn truyền thống Việt Nam",
  "Đồ ăn tráng miệng",
];

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const searchTerm = useSelector((state) => state.search.term);
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [newDish, setNewDish] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: null,
    category: "",
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category]);

  const { data, error, isLoading, refetch } = category === 'all'
    ? useGetMenuQuery({ searchTerm, page: currentPage, limit: 16 })
    : useGetItemByCategoryQuery({ category, searchTerm, page: currentPage, limit: 16 });
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleAddClick = () => {
    setNewDish({
      id: null,
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image: null,
      category: "",
    });
    setOpenDialog(true);
  };

  const handleEditClick = (dish) => {
    setNewDish({
      id: dish._id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      quantity: dish.quantity,
      image: null,
      category: dish.category,
    });
    setOpenDialog(true);
  };

  const handleDeleteClick = (dish) => {
    setDishToDelete(dish);
    setConfirmDeleteDialog(true);
  };

  const handleInputChange = (field, value) => {
    setNewDish({ ...newDish, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDish({ ...newDish, image: file });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
}, [currentPage, searchTerm]);
  const handleSaveDish = async () => {
    try {
      if (newDish.id) {
        await updateItem({ id: newDish.id, menuItemData: newDish }).unwrap();
        showSnackbar("Cập nhật món ăn thành công!", "success");
      } else {
        await addItem({ menuItemData: newDish }).unwrap();
        showSnackbar("Thêm món ăn thành công!", "success");
      }
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to save dish:", err);
      showSnackbar("Có lỗi xảy ra, vui lòng thử lại!", "error");
    }
  };

  const confirmDeleteDish = async () => {
    if (dishToDelete) {
      try {
        await deleteItem(dishToDelete._id).unwrap();
        showSnackbar("Xóa món ăn thành công!", "success");
        setConfirmDeleteDialog(false);
        refetch();
      } catch (err) {
        console.error("Failed to delete dish:", err);
        showSnackbar("Có lỗi xảy ra, vui lòng thử lại!", "error");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const totalPages = data.data.totalPages;
  const menuItems = data.data.menuItems;
  const totalItems = data.data.totalItems

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Container sx={{ flex: "1", paddingBottom: "20px" }}>
          <p className='text-2xl font-semibold pt-4'>QUẢN LÝ MENU</p>
          <div className="flex flex-wrap items-center justify-end gap-y-4 gap-4 text-black">
            <SelectBoxComponent setCategory={setCategory} />
            <SearchComponent setSearchTerm={setSearchTerm} />
          </div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#379777" }}
            onClick={handleAddClick}
            style={{ marginBottom: "16px" }}
          >
            Thêm món ăn mới
          </Button>
          {searchTerm && menuItems?.length > 0 && (
            <div className="text-left text-sm text-gray-700">
              <p>Đã tìm thấy {totalItems} sản phẩm</p>
            </div>
          )}
          <div className="my-4 text-right text-sm text-gray-700">
            {totalPages > 0 && (
              <p>Trang {currentPage} / {totalPages}</p>
            )}
          </div>
          <Grid container spacing={3}>
            {data.data.menuItems.length > 0 ? (
              data.data.menuItems.map((dish) => (
                <Grid item key={dish._id} xs={12} sm={6} md={4} lg={3}>
                  <DishCard
                    dish={dish}
                    onEdit={() => handleEditClick(dish)}
                    onDelete={() => handleDeleteClick(dish)}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Không tìm thấy món ăn nào.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newDish.id ? "Cập nhật món ăn" : "Thêm món ăn mới"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên món ăn"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Giá (VND)"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.price}
            onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Số lượng"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.quantity}
            onChange={(e) => handleInputChange("quantity", parseInt(e.target.value, 10))}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <TextField
            margin="dense"
            select
            label="Loại món ăn"
            fullWidth
            variant="outlined"
            value={newDish.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSaveDish} color="primary">
            {newDish.id ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeleteDialog}
        onClose={() => setConfirmDeleteDialog(false)}
      >
        <DialogTitle>Xác nhận xóa món ăn</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa món ăn này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDeleteDish} color="primary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity={snackbarSeverity}
      />
      {menuItems?.length > 0 && (
        <div className='flex justify-center m-4'>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
