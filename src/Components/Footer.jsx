import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSnackbar({
        open: true,
        message: "Thank you for subscribing!",
        severity: "success",
      });
      setEmail("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const footerLinks = {
    "Shop By Category": [
      "Indoor Plants",
      "Outdoor Plants",
      "Flowering Plants",
      "Succulents",
      "Planters",
      "Plant Care",
    ],
    "Plant Care": [
      "Care Guides",
      "Plant Care Tips",
      "Seasonal Care",
      "Plant Problems",
      "Plant Care Tools",
    ],
    "About Us": [
      "Our Story",
      "Plant Guarantee",
      "Shipping Policy",
      "Return Policy",
      "Privacy Policy",
      "Terms & Conditions",
    ],
    "Customer Service": [
      "Contact Us",
      "FAQs",
      "Track Order",
      "Shipping Info",
      "Returns & Exchanges",
    ],
  };

  return (
    <footer className="bg-white text-gray-800">
      {/* Newsletter Section */}
      <div className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get plant care tips, exclusive offers, and updates on new
              arrivals.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <TextField
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="!bg-green-600 hover:!bg-green-700"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">Contact Us</h3>
              <p className="text-gray-600">Email: support@nursery.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h3 className="font-bold text-lg mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  <FaYoutube className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Nursery. All rights reserved.
          </p>
        </div>
      </div>

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
    </footer>
  );
};

export default Footer;
