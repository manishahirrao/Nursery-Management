import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import SearchBar from "../Pages/Searchbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check login state from localStorage
    const loginState = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");

    if (loginState === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
  };

  return (
    <>
      <nav className="px-4 sm:px-6 md:px-8 lg:px-20 py-3 flex items-center justify-between relative">
        {/* logo */}
        <Link to={"./"}>
          <img className="w-24 sm:w-30 h-auto" src={logo} alt="logo" />
        </Link>

        {/* search bar - hidden on mobile */}
        <div className="hidden md:block w-[400px]">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-5 text-xl font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-green-600 transition-colors w-full py-1  ${
                isActive ? "border-b-4 border-green-700" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `hover:text-green-600 transition-colors w-full py-1 ${
                isActive ? "border-b-4 border-green-700" : ""
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-green-600 transition-colors w-full py-1 ${
                isActive ? "border-b-4 border-green-700" : ""
              }`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-green-600 transition-colors w-full py-1 ${
                isActive ? "border-b-4 border-green-700" : ""
              }`
            }
          >
            Shop
          </NavLink>

          {/* Admin Link */}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `hover:text-green-600 transition-colors w-full py-1 ${
                isActive ? "border-b-4 border-green-700" : ""
              }`
            }
          >
            Admin
          </NavLink>

          {/* icons */}
          <div className="flex items-center gap-4">
            <Link to={"./Cartitem"}>
              <ShoppingCartIcon className="cursor-pointer hover:text-green-600 transition-colors" />
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Avatar
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
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={"./Login"}>
                <AccountCircleIcon className="cursor-pointer hover:text-green-600 transition-colors" />
              </Link>
            )}
          </div>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to={"./Cartitem"}>
            <ShoppingCartIcon className="cursor-pointer hover:text-green-600 transition-colors" />
          </Link>
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <div className="px-4 py-2">
              <SearchBar />
            </div>
            <ul className="flex flex-col px-4 py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                    isActive ? "border-b-4 border-green-700" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                    isActive ? "border-b-4 border-green-700" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                    isActive ? "border-b-4 border-green-700" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                    isActive ? "border-b-4 border-green-700" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                    isActive ? "border-b-4 border-green-700" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </NavLink>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar
                      sx={{
                        bgcolor: "green",
                        width: 32,
                        height: 32,
                      }}
                    >
                      {getInitials(userName)}
                    </Avatar>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-gray-600 hover:text-green-600"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to={"./Login"}
                  className={({ isActive }) =>
                    `py-2 hover:text-green-600 transition-colors px-2 py-1 ${
                      isActive ? "border-b-4 border-green-700" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </ul>
          </div>
        )}
      </nav>
      <hr className="bg-black h-0.5 w-full" />
    </>
  );
};

export default Header;
