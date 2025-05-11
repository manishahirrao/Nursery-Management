import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from "@mui/material";

const featuredProducts = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 1299,
    image: "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
    category: "Indoor Plants",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 899,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    category: "Indoor Plants",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 799,
    image: "https://images.unsplash.com/photo-1596547609266-5d0b0c0c0c0c?w=500",
    category: "Indoor Plants",
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    price: 1499,
    image: "https://images.unsplash.com/photo-1596547609266-5d0b0c0c0c0c?w=500",
    category: "Indoor Plants",
  },
];

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    description: "Perfect for your home",
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    description: "For your garden",
  },
  {
    id: 3,
    name: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    description: "Add color to your space",
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=1200)",
          height: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Bring Nature Home
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Discover our collection of beautiful plants and create your own
            green sanctuary
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/products"
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Container>
      </Paper>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} md={4}>
              <Card
                component={Link}
                to={`/categories/${category.id}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card
                component={Link}
                to={`/product/${product.id}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
