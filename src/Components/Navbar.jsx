import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "bold",
            flexGrow: { xs: 1, md: 0 },
            mr: 2,
          }}
        >
          PlantShop
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            },
            marginRight: 2,
            marginLeft: 0,
            width: { xs: "100%", md: "auto" },
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <InputBase
            placeholder="Search plants..."
            sx={{
              padding: "8px 8px 8px 16px",
              width: "100%",
            }}
          />
          <IconButton sx={{ p: "8px" }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/categories">
            Categories
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        {/* Cart and Profile Icons */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={0} color="primary">
              <CartIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <PersonIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          onClick={handleMobileMenuOpen}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
            Login
          </MenuItem>
          <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
            Register
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            to="/admin-login"
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <AdminIcon fontSize="small" />
            Admin Login
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            component={Link}
            to="/"
            onClick={handleMenuClose}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <HomeIcon fontSize="small" />
            Home
          </MenuItem>
          <MenuItem component={Link} to="/products" onClick={handleMenuClose}>
            Shop
          </MenuItem>
          <MenuItem component={Link} to="/categories" onClick={handleMenuClose}>
            Categories
          </MenuItem>
          <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>
            Contact
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
            Login
          </MenuItem>
          <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
            Register
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            to="/admin-login"
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <AdminIcon fontSize="small" />
            Admin Login
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
