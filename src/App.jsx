import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./Components/Navbar.jsx";
import React from "react";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Categories from "./pages/categories.jsx";
import Contact from "./pages/contact.jsx";
import Cartitem from "./pages/cartitem.jsx";
import Shop from "./pages/shop.jsx";
import AdminPage from "./Admin/AdminPage";
import AdminLogin from "./Admin/AdminLogin";
import ProtectedRoute from "./Admin/ProtectedRoute";
import Orders from "./pages/orders.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32", // Green color for plant theme
    },
    secondary: {
      main: "#81C784", // Light green for accents
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cartitem" element={<Cartitem />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
