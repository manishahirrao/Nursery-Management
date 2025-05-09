import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { products } from "../Pages/Shop";
import { useNavigate } from "react-router-dom";

const categories = [
  "Indoor",
  "Outdoor",
  "Succulent",
  "Flowering",
  "Herbs",
  "Bonsai",
];

const AdminPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [plants, setPlants] = useState(products);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenDialog = (plant = null) => {
    if (plant) {
      setEditingPlant(plant);
      setFormData(plant);
    } else {
      setEditingPlant(null);
      setFormData({
        id: "",
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPlant(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingPlant) {
      // Update existing plant
      setPlants((prev) =>
        prev.map((plant) =>
          plant.id === editingPlant.id
            ? { ...formData, price: Number(formData.price) }
            : plant
        )
      );
      setSnackbar({
        open: true,
        message: "Plant updated successfully!",
        severity: "success",
      });
    } else {
      // Add new plant
      const newPlant = {
        ...formData,
        id: formData.name.toLowerCase().replace(/\s+/g, "-"),
        price: Number(formData.price),
      };
      setPlants((prev) => [...prev, newPlant]);
      setSnackbar({
        open: true,
        message: "Plant added successfully!",
        severity: "success",
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (plantId) => {
    setPlants((prev) => prev.filter((plant) => plant.id !== plantId));
    setSnackbar({
      open: true,
      message: "Plant deleted successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1.5, sm: 1 },
            }}
          >
            Add New Plant
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1.5, sm: 1 },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={plant.image}
                alt={plant.name}
                sx={{
                  height: { xs: 160, sm: 200 },
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    fontWeight: "bold",
                  }}
                >
                  {plant.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  ${plant.price}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Category: {plant.category}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(plant)}
                    size={isMobile ? "small" : "medium"}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(plant.id)}
                    size={isMobile ? "small" : "medium"}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            p: { xs: 2, sm: 3 },
          }}
        >
          {editingPlant ? "Edit Plant" : "Add New Plant"}
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, sm: 2 },
              pt: { xs: 1, sm: 2 },
            }}
          >
            <TextField
              name="name"
              label="Plant Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              fullWidth
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={isMobile ? 2 : 3}
              required
              size={isMobile ? "small" : "medium"}
            />
            <FormControl
              fullWidth
              required
              size={isMobile ? "small" : "medium"}
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Button
            onClick={handleCloseDialog}
            fullWidth={isMobile}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth={isMobile}
          >
            {editingPlant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
