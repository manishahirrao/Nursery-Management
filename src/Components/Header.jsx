import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import SearchBar from "../Pages/Searchbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {
  FaLeaf,
  FaRegHeart,
  FaRegUser,
  FaRegQuestionCircle,
} from "react-icons/fa";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check login state from localStorage
    const loginState = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartCount(cartItems.length);

    if (loginState === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to get first letter of name
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    handleMenuClose();
  };

  const categories = [
    {
      title: "Indoor Plants",
      items: ["Air Purifying", "Low Light", "Pet Friendly", "Large Plants"],
    },
    {
      title: "Outdoor Plants",
      items: ["Flowering", "Trees", "Shrubs", "Climbers"],
    },
    {
      title: "Plant Care",
      items: ["Planters", "Soil", "Fertilizers", "Tools"],
    },
    {
      title: "Gifts",
      items: ["Plant Combos", "Gift Cards", "Plant Care Kits"],
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-green-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>Free shipping on orders above $50</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="hover:text-green-200">
                Contact Us
              </Link>
              <Link to="/faq" className="hover:text-green-200">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={"./"}>
              <img className="w-32 h-auto" src={logo} alt="logo" />
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block w-[400px]">
              <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-green-600 transition-colors ${
                      isActive ? "text-green-600 font-semibold" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <button
                  onClick={handleMenuOpen}
                  className="hover:text-green-600 transition-colors"
                >
                  Categories
                </button>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `hover:text-green-600 transition-colors ${
                      isActive ? "text-green-600 font-semibold" : ""
                    }`
                  }
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/plant-care"
                  className={({ isActive }) =>
                    `hover:text-green-600 transition-colors ${
                      isActive ? "text-green-600 font-semibold" : ""
                    }`
                  }
                >
                  Plant Care
                </NavLink>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <Link to="/wishlist" className="hover:text-green-600">
                  <FaRegHeart className="text-xl" />
                </Link>
                <Link to="/cartitem" className="hover:text-green-600">
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <Avatar
                      onClick={handleMenuOpen}
                      sx={{
                        bgcolor: "green",
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "darkgreen",
                        },
                      }}
                    >
                      {getInitials(userName)}
                    </Avatar>
                  </div>
                ) : (
                  <Link to="/login" className="hover:text-green-600">
                    <FaRegUser className="text-xl" />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <Link to="/cartitem">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon className="hover:text-green-600" />
                </Badge>
              </Link>
              <button onClick={toggleMenu} className="text-2xl">
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Mega Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 400,
              width: "100%",
              maxWidth: 800,
            },
          }}
        >
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-green-600 mb-2">
                    {category.title}
                  </h3>
                  <ul>
                    {category.items.map((item) => (
                      <li key={item}>
                        <Link
                          to={`/shop?category=${item.toLowerCase()}`}
                          className="text-gray-600 hover:text-green-600 block py-1"
                          onClick={handleMenuClose}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Menu>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2">
              <SearchBar />
            </div>
            <div className="px-4 py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 hover:text-green-600 ${
                    isActive ? "text-green-600 font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `block py-2 hover:text-green-600 ${
                    isActive ? "text-green-600 font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                to="/plant-care"
                className={({ isActive }) =>
                  `block py-2 hover:text-green-600 ${
                    isActive ? "text-green-600 font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Plant Care
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `block py-2 hover:text-green-600 ${
                    isActive ? "text-green-600 font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </NavLink>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-green-600"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 hover:text-green-600 ${
                      isActive ? "text-green-600 font-semibold" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
