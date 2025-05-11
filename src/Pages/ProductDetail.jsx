import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
  TextField,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";

// Mock product data
const product = {
  id: 1,
  name: "Monstera Deliciosa",
  price: 1299,
  images: [
    "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
    "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    "https://images.unsplash.com/photo-1596547609266-5d0b0c0c0c0c?w=500",
  ],
  category: "Indoor Plants",
  rating: 4.5,
  reviews: 128,
  description:
    "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a popular indoor plant known for its distinctive split leaves. It's perfect for adding a tropical touch to your home.",
  care: {
    light: "Bright, indirect light",
    water: "Water when top inch of soil is dry",
    humidity: "Prefers high humidity",
    temperature: "65-85°F (18-29°C)",
  },
  features: [
    "Air purifying",
    "Pet friendly",
    "Low maintenance",
    "Fast growing",
  ],
  inStock: true,
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToCart = () => {
    // Add to cart functionality will be implemented later
    console.log("Adding to cart:", { product, quantity });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ position: "relative", paddingTop: "100%" }}>
              <CardMedia
                component="img"
                image={product.images[selectedImage]}
                alt={product.name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {product.images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedImage === index ? "2px solid #2E7D32" : "none",
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`${product.name} ${index + 1}`}
                      sx={{ height: 100, objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviews} reviews)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            ₹{product.price}
          </Typography>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Quantity
            </Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            sx={{ mb: 3 }}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Features */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShippingIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Free Shipping</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Secure Payment</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SupportIcon sx={{ mr: 1 }} />
                <Typography variant="body2">24/7 Support</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Grid item xs={12}>
          <Paper sx={{ mt: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Description" />
              <Tab label="Care Instructions" />
              <Tab label="Features" />
            </Tabs>
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Typography variant="body1">{product.description}</Typography>
              )}
              {tabValue === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Light</Typography>
                    <Typography variant="body1">
                      {product.care.light}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Water</Typography>
                    <Typography variant="body1">
                      {product.care.water}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Humidity</Typography>
                    <Typography variant="body1">
                      {product.care.humidity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Temperature</Typography>
                    <Typography variant="body1">
                      {product.care.temperature}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {tabValue === 2 && (
                <Grid container spacing={2}>
                  {product.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="body1">• {feature}</Typography>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
