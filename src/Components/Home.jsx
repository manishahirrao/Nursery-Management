import React from "react";
import bg from "../assets/bg.jpeg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Title from "../Pages/Title";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaLeaf, FaShieldAlt } from "react-icons/fa";
import { Search } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useCart } from "../context/CartContext";

// Import existing plant images
import indoor from "../assets/indoor.jpeg";
import outdoor from "../assets/outdoor.jpeg";
import flowering from "../assets/flowering.jpeg";
import succulent from "../assets/succulent.jpeg";
// Import featured product images
import bonsai from "../assets/bonsai.jpeg";
import herbs from "../assets/herbs.jpeg";
import pink from "../assets/pink.jpeg";
import red from "../assets/red.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { addToCart } = useCart();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${searchQuery}`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/cartitem");
  };

  const item = [
    {
      id: "1",
      image: indoor,
      name: "Indoor Plants",
    },
    {
      id: "2",
      image: outdoor,
      name: "Outdoor Plants",
    },
    {
      id: "3",
      image: flowering,
      name: "Flowering Plants",
    },
    {
      id: "4",
      image: succulent,
      name: "Succulents",
    },
  ];

  const featuredProducts = [
    {
      id: "bonsai",
      image: bonsai,
      name: "Bonsai",
    },
    {
      id: "herbs",
      image: herbs,
      name: "Herbs",
    },
    {
      id: "pink",
      image: pink,
      name: "Pink Plant",
    },
    {
      id: "red",
      image: red,
      name: "Red Plant",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative">
        <img
          className="w-full h-[40vh] md:h-[600px] object-cover"
          src={bg}
          alt="Background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-8 md:pl-32 w-full md:w-[800px] max-w-full">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold py-2 md:py-4">
            Welcome to Nursery
          </p>
          <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
            Discover the perfect plants for your space. From indoor beauties to
            outdoor wonders, we have everything you need to create your own
            green paradise.
          </p>
          <form onSubmit={handleSearchSubmit} className="w-full mt-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for plants..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                style: { backgroundColor: "white" },
              }}
            />
          </form>
          <Stack className="mt-6 sm:mt-8" spacing={2} direction="row">
            <Button
              variant="contained"
              className="!bg-green-600 hover:!bg-green-700 text-white"
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </Button>
          </Stack>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-white">
        {/* shop by category */}
        <div className="flex flex-col items-center my-8 px-4 sm:px-8">
          <Title text1={"Shop By Category"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 w-full max-w-7xl mx-auto">
            {item.map((cat) => (
              <div
                key={cat.id}
                className="relative w-full sm:w-48 h-40 sm:h-48 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform group"
                onClick={() =>
                  navigate(`/shop?category=${cat.name.toLowerCase()}`)
                }
              >
                <img
                  src={cat.image}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black bg-opacity-0 group-hover:bg-opacity-60 text-white text-center transition-all duration-200 pointer-events-none text-sm sm:text-base">
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* products */}
        <div className="flex flex-col items-center my-8 px-4 sm:px-8">
          <Title text1={"Featured Products"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 w-full max-w-7xl mx-auto">
            {featuredProducts.map((cat) => (
              <div
                key={cat.id}
                className="relative w-full sm:w-48 h-40 sm:h-48 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(`/product/${cat.id}`)}
              >
                <img
                  src={cat.image}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black bg-opacity-60 text-white text-center pointer-events-none text-sm sm:text-base">
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* shipping,care guide,guarantee */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-40 my-10 md:my-20 gap-8 md:gap-20 bg-gray-50 py-10">
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <FaTruck className="text-3xl md:text-4xl text-green-600" />
            <p className="font-semibold text-lg md:text-2xl">Free Shipping</p>
            <p className="text-sm md:text-base">
              Free shipping on all orders over $50
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <FaLeaf className="text-3xl md:text-4xl text-green-600" />
            <p className="font-semibold text-lg md:text-2xl">Plant Care</p>
            <p className="text-sm md:text-base">
              Expert care guides for all your plants
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <FaShieldAlt className="text-3xl md:text-4xl text-green-600" />
            <p className="font-semibold text-lg md:text-2xl">Guarantee</p>
            <p className="text-sm md:text-base">
              30-day plant health guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
