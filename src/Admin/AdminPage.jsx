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
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrderIcon,
  People as PeopleIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { products } from "../Pages/Shop";
import { useNavigate } from "react-router-dom";

// Mock data for orders and users
const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2024-03-15",
    total: 2499,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2024-03-14",
    total: 1799,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    date: "2024-03-13",
    total: 3299,
    status: "Shipped",
    items: 4,
  },
];

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    orders: 3,
    joinDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Customer",
    orders: 2,
    joinDate: "2024-03-01",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    orders: 0,
    joinDate: "2024-01-01",
  },
];

const categories = [
  "Indoor Plants",
  "Outdoor Plants",
  "Succulents",
  "Flowering Plants",
  "Herbs",
];

const AdminPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState(0);
  const [plants, setPlants] = useState(products);
  const [orders] = useState(mockOrders);
  const [users] = useState(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    rating: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Dashboard statistics
  const stats = {
    totalProducts: plants.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        stock: "",
        rating: "",
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

  const renderDashboard = () => (
    <Grid container spacing={3}>
      {/* Statistics Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InventoryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total Products</Typography>
            </Box>
            <Typography variant="h4">{stats.totalProducts}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <OrderIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total Orders</Typography>
            </Box>
            <Typography variant="h4">{stats.totalOrders}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PeopleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total Users</Typography>
            </Box>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total Revenue</Typography>
            </Box>
            <Typography variant="h4">₹{stats.totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>₹{order.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            order.status === "Delivered"
                              ? "success"
                              : order.status === "Processing"
                              ? "warning"
                              : "info"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Users */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Users
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Join Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(0, 5).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            {user.name[0]}
                          </Avatar>
                          {user.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role === "Admin" ? "error" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderProducts = () => (
    <Grid container spacing={3}>
      {plants.map((plant) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={plant.image}
              alt={plant.name}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {plant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {plant.description}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ₹{plant.price}
              </Typography>
              <Chip label={plant.category} size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip
                label={`Stock: ${plant.stock || "N/A"}`}
                size="small"
                color={plant.stock > 0 ? "success" : "error"}
              />
            </CardContent>
            <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(plant)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(plant.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderOrders = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>₹{order.total}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Processing"
                      ? "warning"
                      : "info"
                  }
                />
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderUsers = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Orders</TableCell>
            <TableCell>Join Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                    {user.name[0]}
                  </Avatar>
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.role}
                  color={user.role === "Admin" ? "error" : "default"}
                />
              </TableCell>
              <TableCell>{user.orders}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>
                <Tooltip title="Edit User">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
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
          {activeTab === 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
              startIcon={<AddIcon />}
              sx={{
                width: { xs: "100%", sm: "auto" },
                py: { xs: 1.5, sm: 1 },
              }}
            >
              Add New Plant
            </Button>
          )}
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

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<DashboardIcon />} label="Dashboard" />
          <Tab icon={<InventoryIcon />} label="Products" />
          <Tab icon={<OrderIcon />} label="Orders" />
          <Tab icon={<PeopleIcon />} label="Users" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && renderDashboard()}
        {activeTab === 1 && renderProducts()}
        {activeTab === 2 && renderOrders()}
        {activeTab === 3 && renderUsers()}
      </Box>

      {/* Add/Edit Plant Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingPlant ? "Edit Plant" : "Add New Plant"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Plant Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: "₹",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingPlant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
