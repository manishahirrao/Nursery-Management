import React, { useState, useEffect } from "react";
import Title from "./Title";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Sample products data
export const products = [
  {
    id: "bonsai",
    name: "Bonsai Tree",
    price: 89.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "A beautiful bonsai tree that brings peace and tranquility to any space. Perfect for indoor decoration and meditation.",
    category: "Bonsai",
  },
  {
    id: "herbs",
    name: "Herb Collection",
    price: 24.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Fresh herbs for cooking and wellness. Includes basil, mint, and rosemary.",
    category: "Herbs",
  },
  {
    id: "pink-plant",
    name: "Pink Plant",
    price: 39.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "A stunning pink plant that adds a pop of color to any room. Perfect for brightening up your space.",
    category: "Indoor",
  },
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    price: 49.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Popular tropical plant with distinctive split leaves. Perfect for modern interiors.",
    category: "Indoor",
  },
  {
    id: "succulent-set",
    name: "Succulent Set",
    price: 34.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Collection of 5 different succulents. Low maintenance and perfect for beginners.",
    category: "Succulent",
  },
  {
    id: "orchid",
    name: "Phalaenopsis Orchid",
    price: 29.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Elegant flowering orchid. Blooms for months and adds sophistication to any space.",
    category: "Flowering",
  },
  {
    id: "fern",
    name: "Boston Fern",
    price: 19.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Lush green fern perfect for hanging baskets. Great for adding texture to your space.",
    category: "Indoor",
  },
  {
    id: "cactus",
    name: "Cactus Collection",
    price: 27.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Set of 3 different cacti. Perfect for adding desert vibes to your home.",
    category: "Succulent",
  },
  {
    id: "lavender",
    name: "Lavender Plant",
    price: 22.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Fragrant lavender plant. Perfect for gardens and outdoor spaces.",
    category: "Outdoor",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    price: 32.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Hardy plant that purifies air. Perfect for bedrooms and offices.",
    category: "Indoor",
  },
  {
    id: "rose-bush",
    name: "Rose Bush",
    price: 44.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Beautiful flowering rose bush. Perfect for gardens and outdoor spaces.",
    category: "Outdoor",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    price: 18.99,
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Medicinal plant with healing properties. Easy to care for and practical.",
    category: "Succulent",
  },
];

const categories = [
  { value: "", label: "All Categories" },
  { value: "indoor", label: "Indoor Plants" },
  { value: "outdoor", label: "Outdoor Plants" },
  { value: "succulent", label: "Succulents" },
  { value: "flowering", label: "Flowering Plants" },
  { value: "herbs", label: "Herbs" },
  { value: "bonsai", label: "Bonsai" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAlert(true);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/cartitem");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title text1="Shop" />

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <TextField
          fullWidth
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              className="h-48 object-cover"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-4"
              >
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary" className="mb-4">
                ${product.price}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleAddToCart(product)}
                  className="!border-green-600 !text-green-600 hover:!bg-green-50"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleBuyNow(product)}
                  className="!bg-green-600 hover:!bg-green-700"
                >
                  Buy Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </div>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Shop;
