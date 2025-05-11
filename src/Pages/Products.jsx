import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Rating,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  LocalShipping as ShippingIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
} from "@mui/icons-material";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 1299,
    image: "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
    category: "Indoor Plants",
    rating: 4.5,
    inStock: true,
    description:
      "Popular tropical plant known for its distinctive split leaves",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 899,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    category: "Indoor Plants",
    rating: 4.2,
    inStock: true,
    description: "Low-maintenance plant with upright, sword-like leaves",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 799,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Indoor Plants",
    rating: 4.3,
    inStock: true,
    description: "Elegant plant with glossy leaves and white flowers",
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    price: 2499,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Indoor Plants",
    rating: 4.6,
    inStock: true,
    description: "Trendy plant with large, violin-shaped leaves",
  },
  {
    id: 5,
    name: "Aloe Vera",
    price: 499,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Succulents",
    rating: 4.4,
    inStock: true,
    description: "Medicinal succulent with healing properties",
  },
  {
    id: 6,
    name: "Jade Plant",
    price: 599,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Succulents",
    rating: 4.1,
    inStock: true,
    description: "Symbol of good luck with thick, glossy leaves",
  },
  {
    id: 7,
    name: "Rose Plant",
    price: 699,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Flowering Plants",
    rating: 4.7,
    inStock: true,
    description: "Classic flowering plant with fragrant blooms",
  },
  {
    id: 8,
    name: "Orchid",
    price: 899,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Flowering Plants",
    rating: 4.5,
    inStock: true,
    description: "Exotic flowering plant with long-lasting blooms",
  },
  {
    id: 9,
    name: "Basil Plant",
    price: 299,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Herbs",
    rating: 4.3,
    inStock: true,
    description: "Aromatic herb perfect for cooking",
  },
  {
    id: 10,
    name: "Mint Plant",
    price: 249,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Herbs",
    rating: 4.2,
    inStock: true,
    description: "Refreshing herb for teas and cocktails",
  },
  {
    id: 11,
    name: "Bamboo Palm",
    price: 1499,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Indoor Plants",
    rating: 4.4,
    inStock: true,
    description: "Tropical palm perfect for indoor spaces",
  },
  {
    id: 12,
    name: "ZZ Plant",
    price: 999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Indoor Plants",
    rating: 4.6,
    inStock: true,
    description: "Low-maintenance plant with glossy leaves",
  },
];

const categories = [
  "Indoor Plants",
  "Outdoor Plants",
  "Flowering Plants",
  "Succulents",
  "Herbs",
];

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(
      selectedCategories.includes(value)
        ? selectedCategories.filter((cat) => cat !== value)
        : [...selectedCategories, value]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const renderFilterChips = () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
      {selectedCategories.map((category) => (
        <Chip
          key={category}
          label={category}
          onDelete={() => handleCategoryChange({ target: { value: category } })}
          color="primary"
          variant="outlined"
          size="small"
        />
      ))}
      {searchQuery && (
        <Chip
          label={`Search: ${searchQuery}`}
          onDelete={() => setSearchQuery("")}
          color="primary"
          variant="outlined"
          size="small"
        />
      )}
      {(priceRange[0] > 0 || priceRange[1] < 5000) && (
        <Chip
          label={`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`}
          onDelete={() => setPriceRange([0, 5000])}
          color="primary"
          variant="outlined"
          size="small"
        />
      )}
    </Box>
  );

  const renderFilters = () => (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <FilterIcon /> Filters
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search plants..."
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ my: 2 }} />

      {/* Categories */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                value={category}
                sx={{
                  color: theme.palette.primary.main,
                  "&.Mui-checked": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Typography variant="body2">
                {category} (
                {products.filter((p) => p.category === category).length})
              </Typography>
            }
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* Price Range */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={100}
          sx={{
            color: theme.palette.primary.main,
            "& .MuiSlider-thumb": {
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(46, 125, 50, 0.16)",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Chip
            label={`₹${priceRange[0]}`}
            size="small"
            sx={{ bgcolor: theme.palette.primary.light, color: "white" }}
          />
          <Chip
            label={`₹${priceRange[1]}`}
            size="small"
            sx={{ bgcolor: theme.palette.primary.light, color: "white" }}
          />
        </Box>
      </Box>

      {/* Active Filters */}
      {(selectedCategories.length > 0 ||
        searchQuery ||
        priceRange[0] > 0 ||
        priceRange[1] < 5000) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Active Filters
          </Typography>
          {renderFilterChips()}
        </>
      )}
    </Paper>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Bar */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>

            {/* Sort and Filter Controls */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={handleSortChange}
                      label="Sort By"
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      label="Category"
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              size="small"
                              onDelete={() =>
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (cat) => cat !== value
                                  )
                                )
                              }
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          <Checkbox
                            checked={selectedCategories.includes(category)}
                          />
                          <ListItemText primary={category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                    <InputLabel>Price Range</InputLabel>
                    <Select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      label="Price Range"
                    >
                      <MenuItem value={[0, 5000]}>All Prices</MenuItem>
                      <MenuItem value={[0, 500]}>Under ₹500</MenuItem>
                      <MenuItem value={[500, 1000]}>₹500 - ₹1000</MenuItem>
                      <MenuItem value={[1000, 2000]}>₹1000 - ₹2000</MenuItem>
                      <MenuItem value={[2000, 5000]}>Above ₹2000</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Active Filters */}
            {renderFilterChips()}
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? 200 : 250}
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      bgcolor: "grey.100",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "background.paper",
                      "&:hover": {
                        bgcolor: "background.paper",
                      },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  {!product.inStock && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                      }}
                    >
                      <Typography variant="h6">Out of Stock</Typography>
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      size={isMobile ? "small" : "medium"}
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      ({product.rating})
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                      disabled={!product.inStock}
                      startIcon={<CartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {filteredProducts.length === 0 && (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or search query
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
