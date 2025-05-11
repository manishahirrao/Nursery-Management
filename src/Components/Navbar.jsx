import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Container,
  Fade,
  Slide,
  Avatar,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
  ContactSupport as ContactIcon,
  Store as ShopIcon,
  LocalShipping as ShippingIcon,
  Favorite as FavoriteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "auto",
    minWidth: 300,
  },
  transition: "all 0.3s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 400,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    width: active ? "100%" : "0%",
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.primary.main,
    transition: "width 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      width: "100%",
    },
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: scrolled ? "background.paper" : "transparent",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 0.5,
          display: { xs: "none", md: "block" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">
              Free shipping on orders above $50
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                to="/contact"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                FAQ
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Toolbar
        sx={{
          flexWrap: { xs: "wrap", md: "nowrap" },
          py: { xs: 1, md: 1.5 },
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
              flexGrow: { xs: 1, md: 0 },
              mr: 2,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ShippingIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
            PlantShop
          </Typography>

          {/* Search Bar - Desktop */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search plants..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              ml: 2,
            }}
          >
            <NavButton
              component={Link}
              to="/"
              active={isActive("/")}
              startIcon={<HomeIcon />}
            >
              Home
            </NavButton>
            <NavButton
              component={Link}
              to="/shop"
              active={isActive("/shop")}
              startIcon={<ShopIcon />}
            >
              Shop
            </NavButton>
            <NavButton
              component={Link}
              to="/categories"
              active={isActive("/categories")}
              startIcon={<CategoryIcon />}
            >
              Categories
            </NavButton>
            <NavButton
              component={Link}
              to="/contact"
              active={isActive("/contact")}
              startIcon={<ContactIcon />}
            >
              Contact
            </NavButton>
          </Box>

          {/* Cart and Profile Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: { xs: 0, md: 2 },
              gap: 1,
            }}
          >
            <Tooltip title="Wishlist">
              <IconButton
                color="inherit"
                component={Link}
                to="/wishlist"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart">
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Badge badgeContent={0} color="primary">
                  <CartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{ ml: { xs: 0, sm: 1 } }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search">
              <IconButton
                color="inherit"
                onClick={toggleSearch}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Menu">
              <IconButton
                color="inherit"
                onClick={toggleMobileMenu}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>

        {/* Mobile Search Bar */}
        <Collapse in={searchOpen} sx={{ width: "100%", mt: 1 }}>
          <Container maxWidth="lg">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search plants..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton
                onClick={toggleSearch}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Search>
          </Container>
        </Collapse>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              width: { xs: "100%", sm: 240 },
              maxWidth: "100%",
              mt: 1.5,
              borderRadius: 2,
              overflow: "visible",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleMenuClose}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </MenuItem>
          <MenuItem
            component={Link}
            to="/register"
            onClick={handleMenuClose}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            to="/admin-login"
            onClick={handleMenuClose}
            sx={{
              py: 1.5,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <AdminIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Admin Login" />
          </MenuItem>
        </Menu>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              width: { xs: "100%", sm: 300 },
              maxWidth: "100%",
              borderRadius: { xs: 0, sm: "16px 0 0 16px" },
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="primary" fontWeight="bold">
              Menu
            </Typography>
            <IconButton onClick={handleMobileMenuClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ pt: 2 }}>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={handleMobileMenuClose}
              selected={isActive("/")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon color={isActive("/") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/shop"
              onClick={handleMobileMenuClose}
              selected={isActive("/shop")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <ShopIcon color={isActive("/shop") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/categories"
              onClick={handleMobileMenuClose}
              selected={isActive("/categories")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <CategoryIcon
                  color={isActive("/categories") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/contact"
              onClick={handleMobileMenuClose}
              selected={isActive("/contact")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <ContactIcon
                  color={isActive("/contact") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem
              button
              component={Link}
              to="/wishlist"
              onClick={handleMobileMenuClose}
              selected={isActive("/wishlist")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <FavoriteIcon
                  color={isActive("/wishlist") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={handleMobileMenuClose}
              selected={isActive("/cart")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={0} color="primary">
                  <CartIcon color={isActive("/cart") ? "primary" : "inherit"} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleMobileMenuClose}
              selected={isActive("/login")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon
                  color={isActive("/login") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              onClick={handleMobileMenuClose}
              selected={isActive("/register")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon
                  color={isActive("/register") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem
              button
              component={Link}
              to="/admin-login"
              onClick={handleMobileMenuClose}
              selected={isActive("/admin-login")}
              sx={{
                color: "primary.main",
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <AdminIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Login" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
