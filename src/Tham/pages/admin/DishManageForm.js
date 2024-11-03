import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import DishCard from "../../components/DishCard_admin.js";
import ImageFood1 from "../../assets/images/dish_card_item_1.jpg";
import ImageFood2 from "../../assets/images/dish_card_item_2.jpg";
import ImageFood3 from "../../assets/images/dish_card_item_3.jpg";
import ImageFood4 from "../../assets/images/dish_card_item_4.jpg";
import ImageFood5 from "../../assets/images/dish_card_item_5.jpg";
import ImageFood6 from "../../assets/images/dish_card_item_6.jpg";
import ImageFood7 from "../../assets/images/dish_card_item_7.jpg";
import ImageFood8 from "../../assets/images/dish_card_item_8.jpg";
import ImageFood9 from "../../assets/images/dish_card_item_9.jpg";
import ImageFood10 from "../../assets/images/dish_card_item_10.jpg";
import "../../styles/pages/DishManageForm.css";

const initialDishes = [
  {
    id: 1,
    name: "Món Spaghetti",
    description: "Món mì Ý thơm ngon với sốt kem béo ngậy.",
    price: 50000,
    quantity: 10,
    image: ImageFood1,
    category: "Đồ ăn Châu Âu",
  },
  {
    id: 2,
    name: "Há cảo ăn kèm gà chiên xù",
    description: "Món há cảo nóng hổi ăn kèm với gà chiên.",
    price: 50000,
    quantity: 5,
    image: ImageFood2,
    category: "Đồ ăn châu Á",
  },
  {
    id: 3,
    name: "Cơm sườn trứng chiên",
    description: "Món cơm sườn trứng chiên giòn và thơm ngon",
    price: 50000,
    quantity: 5,
    image: ImageFood3,
    category: "Đồ ăn truyền thống Việt Nam",
  },
  {
    id: 4,
    name: "BeefSteak",
    description: "Món bò bít tết mềm và ngon miệng",
    price: 50000,
    quantity: 5,
    image: ImageFood4,
    category: "Đồ ăn Châu Âu",
  },
  {
    id: 5,
    name: "Bún mọc",
    description: "Món bún mọc nước dùng thơm ngon và đậm đà",
    price: 50000,
    quantity: 5,
    image: ImageFood5,
    category: "Đồ ăn truyền thống Việt Nam",
  },
  {
    id: 6,
    name: "Gà nugget vòng",
    description: "Món gà nugget vòng giòn rụm và đậm đà",
    price: 50000,
    quantity: 5,
    image: ImageFood6,
    category: "Đồ ăn Châu Âu",
  },
  {
    id: 7,
    name: "Bún đậu mắm tôm",
    description: "Món bún đậu mắm tôm đầy đủ với nhiều topping đặc biệt",
    price: 50000,
    quantity: 5,
    image: ImageFood7,
    category: "Đồ ăn truyền thống Việt Nam",
  },
  {
    id: 8,
    name: "Phở bò",
    description: "Phở bò với nước dùng đậm đà đặc biệt",
    price: 50000,
    quantity: 5,
    image: ImageFood8,
    category: "Đồ ăn truyền thống Việt Nam",
  },
  {
    id: 9,
    name: "Cơm gà nướng",
    description: "cơm gà nướng đặc biệt",
    price: 50000,
    quantity: 5,
    image: ImageFood9,
    category: "Đồ ăn truyền thống Việt Nam",
  },
  {
    id: 10,
    name: "Bánh xèo đặc biệt",
    description: "Bánh xèo nhân tôm với nhiều topping đặc biệt",
    price: 50000,
    quantity: 5,
    image: ImageFood10,
    category: "Đồ ăn truyền thống Việt Nam",
  },
];

const categories = [
  "Đồ ăn Châu Âu",
  "Đồ ăn nướng",
  "Đồ ăn truyền thống Việt Nam",
  "Đồ ăn tráng miệng",
];

const DishManageForm = () => {
  const [dishes, setDishes] = useState(initialDishes);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
    category: "",
  });
  const [editingDish, setEditingDish] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setNewDish(dish);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setDishToDelete(id);
    setConfirmDeleteDialog(true);
  };

  const confirmDeleteDish = () => {
    const updatedDishes = dishes.filter((dish) => dish.id !== dishToDelete);
    setDishes(updatedDishes);
    setConfirmDeleteDialog(false);
    setDishToDelete(null);
  };

  const handleAddClick = () => {
    setEditingDish(null);
    setNewDish({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image: "",
      category: "",
    });
    setOpenDialog(true);
  };

  const handleAddDish = () => {
    const dishToAdd = {
      ...newDish,
      id: dishes.length ? dishes[dishes.length - 1].id + 1 : 1,
    };
    setDishes([...dishes, dishToAdd]);
    setOpenDialog(false);
  };

  const handleUpdateDish = () => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === editingDish.id ? newDish : dish
    );
    setDishes(updatedDishes);
    setOpenDialog(false);
    setEditingDish(null);
  };

  const handleLogout = () => {
    setConfirmLogoutDialog(true);
  };

  const confirmLogout = () => {
    setConfirmLogoutDialog(false);
    console.log("Log out successfully!");
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className="header" sx={{ bgcolor: "#B43f3f" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Restaurant Management Page
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Container sx={{ flex: "1", paddingBottom: "20px" }}>
          <h1>Dishes Management</h1>
          <TextField
            label="Dishes Search"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "16px" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#379777" }}
            onClick={handleAddClick}
            style={{ marginBottom: "16px" }}
          >
            Add New Dish
          </Button>
          <Grid container spacing={3}>
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <Grid item key={dish.id} xs={12} sm={6} md={4} lg={3}>
                  <DishCard
                    dish={dish}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  No dishes found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>

        <footer
          style={{
            backgroundColor: "#B43f3f",
            padding: "16px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="body1">© 2024 Restaurant Management</Typography>
        </footer>
      </Box>

      <Dialog
        open={confirmDeleteDialog}
        onClose={() => setConfirmDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete This Dish</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this dish?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteDish} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingDish ? "Update Dish" : "Add New Dish"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name Dish"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.description}
            onChange={(e) =>
              setNewDish({ ...newDish, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Price (VND)"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.price}
            onChange={(e) =>
              setNewDish({ ...newDish, price: parseFloat(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.quantity}
            onChange={(e) =>
              setNewDish({ ...newDish, quantity: parseInt(e.target.value, 10) })
            }
          />
          <TextField
            margin="dense"
            label="URL Image"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.image}
            onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
          />
          <TextField
            margin="dense"
            select
            label="Category"
            fullWidth
            variant="outlined"
            value={newDish.category}
            onChange={(e) =>
              setNewDish({ ...newDish, category: e.target.value })
            }
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
            Cancel
          </Button>
          <Button
            onClick={editingDish ? handleUpdateDish : handleAddDish}
            color="primary"
          >
            {editingDish ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmLogoutDialog}
        onClose={() => setConfirmLogoutDialog(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmLogoutDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="primary">
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DishManageForm;
