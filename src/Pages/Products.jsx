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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Plant Shop
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Discover our collection of beautiful plants for your home and garden
        </Typography>
      </Box>

      {/* Combined Search, Sort, and Filter Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
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
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Sort and Filter Controls */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} alignItems="center">
              {/* Sort */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="price-low-high">
                      Price: Low to High
                    </MenuItem>
                    <MenuItem value="price-high-low">
                      Price: High to Low
                    </MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Category Filter */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    label="Category"
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                        />
                        <Typography variant="body2">
                          {category} (
                          {
                            products.filter((p) => p.category === category)
                              .length
                          }
                          )
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Range Filter */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Price Range</InputLabel>
                  <Select
                    value={`${priceRange[0]}-${priceRange[1]}`}
                    label="Price Range"
                    onChange={(e) => {
                      const [min, max] = e.target.value.split("-").map(Number);
                      setPriceRange([min, max]);
                    }}
                  >
                    <MenuItem value="0-5000">All Prices</MenuItem>
                    <MenuItem value="0-1000">Under ₹1,000</MenuItem>
                    <MenuItem value="1000-2000">₹1,000 - ₹2,000</MenuItem>
                    <MenuItem value="2000-3000">₹2,000 - ₹3,000</MenuItem>
                    <MenuItem value="3000-5000">Above ₹3,000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {(selectedCategories.length > 0 ||
            searchQuery ||
            priceRange[0] > 0 ||
            priceRange[1] < 5000) && (
            <Grid item xs={12}>
              {renderFilterChips()}
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Zoom in={true}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      transition: "transform 0.3s",
                      transform:
                        hoveredProduct === product.id
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  {product.inStock && (
                    <Chip
                      label="In Stock"
                      color="success"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor: "rgba(46, 125, 50, 0.9)",
                        color: "white",
                      }}
                    />
                  )}
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      icon={<StarIcon fontSize="inherit" />}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.rating})
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mt: "auto", mb: 1 }}
                  >
                    ₹{product.price}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<CartIcon />}
                      component={Link}
                      to={`/product/${product.id}`}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center", mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            No plants found matching your criteria
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Try adjusting your filters or search terms
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedCategories([]);
              setSearchQuery("");
              setPriceRange([0, 5000]);
            }}
            sx={{ mt: 2 }}
          >
            Clear All Filters
          </Button>
        </Paper>
      )}

      {/* Mobile Filter Drawer - Keep this for mobile view */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>{renderFilters()}</Box>
      </Drawer>
    </Container>
  );
};

export default Products;
