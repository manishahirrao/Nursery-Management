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
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 49.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg",
      description: "Large tropical plant with distinctive split leaves",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 39.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg",
      description: "Low-maintenance plant with upright leaves",
    },
    {
      id: 3,
      name: "Peace Lily",
      price: 29.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg",
      description: "Elegant plant with white flowers",
    },
    {
      id: 4,
      name: "Aloe Vera",
      price: 24.99,
      category: "Succulent",
      image:
        "https://images.pexels.com/photos/4503261/pexels-photo-4503261.jpeg",
      description: "Medicinal succulent plant",
    },
    {
      id: 5,
      name: "Fiddle Leaf Fig",
      price: 59.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/1005056/pexels-photo-1005056.jpeg",
      description: "Popular indoor tree with large leaves",
    },
    {
      id: 6,
      name: "Cactus Collection",
      price: 34.99,
      category: "Succulent",
      image:
        "https://images.pexels.com/photos/1093029/pexels-photo-1093029.jpeg",
      description: "Set of 3 different cacti",
    },
    {
      id: 7,
      name: "Bird of Paradise",
      price: 69.99,
      category: "Outdoor",
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg",
      description: "Exotic tropical plant with large, banana-like leaves",
    },
    {
      id: 8,
      name: "ZZ Plant",
      price: 44.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/4503263/pexels-photo-4503263.jpeg",
      description: "Low-maintenance plant with glossy leaves",
    },
    {
      id: 9,
      name: "String of Pearls",
      price: 19.99,
      category: "Succulent",
      image:
        "https://images.pexels.com/photos/4503254/pexels-photo-4503254.jpeg",
      description: "Unique trailing succulent with pearl-like leaves",
    },
    {
      id: 10,
      name: "Calathea Orbifolia",
      price: 54.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/5699662/pexels-photo-5699662.jpeg",
      description: "Stunning plant with large, patterned leaves",
    },
    {
      id: 11,
      name: "Pothos Golden",
      price: 24.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/3629595/pexels-photo-3629595.jpeg",
      description: "Easy-care trailing plant with variegated leaves",
    },
    {
      id: 12,
      name: "Chinese Evergreen",
      price: 34.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/4503249/pexels-photo-4503249.jpeg",
      description: "Beautiful foliage plant with silver patterns",
    },
    {
      id: 13,
      name: "Rubber Plant",
      price: 49.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/4503260/pexels-photo-4503260.jpeg",
      description: "Classic houseplant with large, glossy leaves",
    },
    {
      id: 14,
      name: "String of Hearts",
      price: 22.99,
      category: "Succulent",
      image:
        "https://images.pexels.com/photos/4503258/pexels-photo-4503258.jpeg",
      description: "Delicate trailing plant with heart-shaped leaves",
    },
    {
      id: 15,
      name: "Dragon Tree",
      price: 39.99,
      category: "Indoor",
      image:
        "https://images.pexels.com/photos/4503255/pexels-photo-4503255.jpeg",
      description: "Striking plant with sword-like leaves",
    },
    {
      id: 16,
      name: "Lavender",
      price: 19.99,
      category: "Herbs",
      image:
        "https://images.pexels.com/photos/1181393/pexels-photo-1181393.jpeg",
      description: "Fragrant herb with purple flowers",
    },
    {
      id: 17,
      name: "Juniper Bonsai",
      price: 89.99,
      category: "Bonsai",
      image:
        "https://images.pexels.com/photos/1336342/pexels-photo-1336342.jpeg",
      description: "Classic bonsai tree with needle-like foliage",
    },
    {
      id: 18,
      name: "Rose Plant",
      price: 29.99,
      category: "Flowering",
      image: "https://images.pexels.com/photos/931167/pexels-photo-931167.jpeg",
      description: "Beautiful flowering plant with fragrant blooms",
    },
  ];

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (product) => {
    setShowAlert(true);
  };

  const buyNow = (product) => {
    setShowAlert(true);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6 md:py-8 mb-5">
      <Title text1="Shop Plants" />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
        <TextField
          label="Search Plants"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow"
          size="small"
        />
        <FormControl className="w-full sm:w-48" size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Indoor">Indoor</MenuItem>
            <MenuItem value="Outdoor">Outdoor</MenuItem>
            <MenuItem value="Flowering">Flowering</MenuItem>
            <MenuItem value="Succulent">Succulent</MenuItem>
            <MenuItem value="Herbs">Herbs</MenuItem>
            <MenuItem value="Bonsai">Bonsai</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="w-full sm:w-48" size="small">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="h-full flex flex-col">
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              className="object-cover h-[180px] sm:h-[200px]"
            />
            <CardContent className="flex-grow flex flex-col">
              <Typography
                variant="h6"
                component="div"
                className="font-semibold text-base sm:text-lg"
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-2 text-sm sm:text-base"
              >
                {product.description}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                className="mt-4 text-base sm:text-lg"
              >
                ${product.price.toFixed(2)}
              </Typography>
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => addToCart(product)}
                  className="!bg-green-600 hover:!bg-green-700 text-white text-sm sm:text-base py-1 sm:py-2"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => buyNow(product)}
                  className="!border-green-600 !text-green-600 hover:!bg-green-50 text-sm sm:text-base py-1 sm:py-2"
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert for adding to cart */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
