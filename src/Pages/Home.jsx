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
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Stack,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ShoppingCart as CartIcon,
  Store as StoreIcon,
} from "@mui/icons-material";

// Import local assets
import indoorImage from "../assets/indoor.jpeg";
import outdoorImage from "../assets/outdoor.jpeg";
import floweringImage from "../assets/flowering.jpeg";
import bonsaiImage from "../assets/bonsai.jpeg";
import herbsImage from "../assets/herbs.jpeg";
import succulentImage from "../assets/succulent.jpeg";
import pinkImage from "../assets/pink.jpeg";
import redImage from "../assets/red.jpeg";
import purpleImage from "../assets/purple.jpeg";

const featuredProducts = [
  {
    id: 1,
    name: "Bonsai Tree",
    price: 1299,
    image: bonsaiImage,
    category: "Bonsai",
    description: "Beautiful miniature tree perfect for meditation spaces",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 2,
    name: "Herbs Collection",
    price: 899,
    image: herbsImage,
    category: "Herbs",
    description: "Fresh herbs for cooking and wellness",
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 3,
    name: "Pink Anthurium",
    price: 799,
    image: pinkImage,
    category: "Indoor Plants",
    description: "Stunning pink flowering plant for indoor spaces",
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 4,
    name: "Red Aglaonema",
    price: 1499,
    image: redImage,
    category: "Indoor Plants",
    description: "Vibrant red foliage plant for modern interiors",
    rating: 4.9,
    reviews: 245,
  },
  {
    id: 5,
    name: "Purple Orchid",
    price: 999,
    image: purpleImage,
    category: "Flowering Plants",
    description: "Elegant purple orchid for sophisticated spaces",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 6,
    name: "Succulent Garden",
    price: 699,
    image: succulentImage,
    category: "Succulents",
    description: "Low-maintenance succulent collection",
    rating: 4.5,
    reviews: 167,
  },
  {
    id: 7,
    name: "Indoor Plant Bundle",
    price: 2499,
    image: indoorImage,
    category: "Indoor Plants",
    description: "Curated collection of popular indoor plants",
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 8,
    name: "Outdoor Garden Set",
    price: 1899,
    image: outdoorImage,
    category: "Outdoor Plants",
    description: "Complete garden set for outdoor spaces",
    rating: 4.6,
    reviews: 198,
  },
];

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    image: indoorImage,
    description: "Perfect for your home",
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image: outdoorImage,
    description: "For your garden",
  },
  {
    id: 3,
    name: "Flowering Plants",
    image: floweringImage,
    description: "Add color to your space",
  },
  {
    id: 4,
    name: "Bonsai",
    image: bonsaiImage,
    description: "Miniature masterpieces",
  },
  {
    id: 5,
    name: "Herbs",
    image: herbsImage,
    description: "Fresh and fragrant",
  },
  {
    id: 6,
    name: "Succulents",
    image: succulentImage,
    description: "Low maintenance beauty",
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: { xs: 2, sm: 3, md: 6 },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${indoorImage})`,
          height: { xs: "60vh", sm: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          borderRadius: { xs: 0, sm: 2 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.6)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}
        >
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: "100%", md: "70%" } }}>
              <Typography
                component="h1"
                variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                Bring Nature Home
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="inherit"
                paragraph
                sx={{
                  maxWidth: "600px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  mb: { xs: 2, sm: 3, md: 4 },
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  opacity: 0.9,
                }}
              >
                Discover our collection of beautiful plants and create your own
                green sanctuary
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "large" : "large"}
                component={Link}
                to="/products"
                sx={{
                  px: { xs: 4, sm: 5, md: 6 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Fade>
        </Container>
      </Paper>

      {/* Categories Section */}
      <Container
        maxWidth="lg"
        sx={{ mb: { xs: 4, sm: 5, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <Typography
          variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
          component="h2"
          gutterBottom
          sx={{
            mb: { xs: 3, sm: 4, md: 5 },
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {categories.map((category, index) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <Zoom
                in
                timeout={500}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  component={Link}
                  to={`/categories/${category.id}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    transition: "all 0.2s ease-in-out",
                    borderRadius: 2,
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 200 : isTablet ? 250 : 300}
                    image={category.image}
                    alt={category.name}
                    sx={{
                      objectFit: "cover",
                      bgcolor: "grey.100",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 2, sm: 3 },
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant={isMobile ? "h6" : "h5"}
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        mb: { xs: 1, sm: 2 },
                      }}
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container
        maxWidth="lg"
        sx={{ mb: { xs: 4, sm: 5, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Featured Products
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/cart"
              startIcon={<CartIcon />}
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 1,
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              View Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/shop"
              startIcon={<StoreIcon />}
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              View All Products
            </Button>
          </Stack>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            "& .MuiGrid-item": {
              display: "flex",
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Zoom
                in
                timeout={500}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  component={Link}
                  to={`/product/${product.id}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: theme.shadows[1],
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: {
                        xs: 200,
                        sm: 220,
                        md: 240,
                        lg: 260,
                      },
                      objectFit: "cover",
                      bgcolor: "grey.100",
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant={isMobile ? "h6" : "h5"}
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {
                          xs: "1.1rem",
                          sm: "1.2rem",
                          md: "1.3rem",
                        },
                        lineHeight: 1.2,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: {
                          xs: "0.875rem",
                          sm: "0.9rem",
                          md: "1rem",
                        },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: { xs: 0.5, sm: 1 },
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            sx={{
                              color:
                                index < Math.floor(product.rating)
                                  ? "warning.main"
                                  : "grey.300",
                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                                md: "1.2rem",
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.8rem",
                            md: "0.875rem",
                          },
                          ml: 0.5,
                        }}
                      >
                        ({product.reviews})
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {
                          xs: "1.1rem",
                          sm: "1.2rem",
                          md: "1.3rem",
                        },
                        mt: "auto",
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section - Moved below Featured Products */}
      <Container
        maxWidth="lg"
        sx={{
          mb: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 2, sm: 3, md: 4 }, // Added top margin
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {[
            {
              icon: <ShippingIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              title: "Free Shipping",
              description: "On orders above ₹1000",
            },
            {
              icon: <VerifiedIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              title: "Quality Plants",
              description: "Carefully selected and nurtured",
            },
            {
              icon: <StarIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
              title: "Expert Care",
              description: "Tips and support for your plants",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Zoom
                in
                timeout={500}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: "100%",
                    textAlign: "center",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[2],
                    },
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: { xs: 1, sm: 2 } }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
