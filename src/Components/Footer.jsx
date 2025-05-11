import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";

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
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              PlantShop
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Bringing nature into your home with our carefully curated
              collection of plants. We believe in sustainable gardening and
              helping you create your own green sanctuary.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Shop
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/products"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  All Plants
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/categories"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Categories
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/new-arrivals"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  New Arrivals
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/best-sellers"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Best Sellers
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Contact Us
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/shipping"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Shipping Info
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/returns"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Returns
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  FAQ
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Stay updated with our latest products and gardening tips.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ height: "40px" }}
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Footer */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} PlantShop. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                gap: 2,
              }}
            >
              <Link
                to="/privacy"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Privacy Policy
                </Typography>
              </Link>
              <Link
                to="/terms"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Terms of Service
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>

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

export default Footer;
