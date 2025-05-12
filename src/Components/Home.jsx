// import React from "react";
// import back from "../assets/back.jpeg";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Title from "../pages/Title";
// import { useNavigate } from "react-router-dom";
// import {
//   FaTruck,
//   FaLeaf,
//   FaShieldAlt,
//   FaRegHeart,
//   FaRegStar,
//   FaRegClock,
// } from "react-icons/fa";
// import { Search } from "@mui/icons-material";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import { useCart } from "../context/CartContext";
// import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

// // Import existing plant images
// import indoor from "../assets/indoor.jpeg";
// import outdoor from "../assets/outdoor.jpeg";
// import flowering from "../assets/flowering.jpeg";
// import succulent from "../assets/succulent.jpeg";
// // Import featured product images
// import bonsai from "../assets/bonsai.jpeg";
// import herbs from "../assets/herbs.jpeg";
// import pink from "../assets/pink.jpeg";
// import red from "../assets/red.jpeg";

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const { addToCart } = useCart();

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/shop?search=${searchQuery}`);
//   };

//   const handleBuyNow = (product) => {
//     addToCart(product);
//     navigate("/cartitem");
//   };

//   const categories = [
//     {
//       id: "1",
//       image: indoor,
//       name: "Indoor Plants",
//       description: "Perfect for your home and office spaces",
//     },
//     {
//       id: "2",
//       image: outdoor,
//       name: "Outdoor Plants",
//       description: "Transform your garden and balcony",
//     },
//     {
//       id: "3",
//       image: flowering,
//       name: "Flowering Plants",
//       description: "Add colors to your space",
//     },
//     {
//       id: "4",
//       image: succulent,
//       name: "Succulents",
//       description: "Low maintenance beauties",
//     },
//   ];

//   const featuredProducts = [
//     {
//       id: "bonsai",
//       image: bonsai,
//       name: "Bonsai",
//       price: 29.99,
//       rating: 4.5,
//       reviews: 128,
//     },
//     {
//       id: "herbs",
//       image: herbs,
//       name: "Herbs Collection",
//       price: 24.99,
//       rating: 4.8,
//       reviews: 256,
//     },
//     {
//       id: "pink",
//       image: pink,
//       name: "Pink Anthurium",
//       price: 34.99,
//       rating: 4.7,
//       reviews: 89,
//     },
//     {
//       id: "red",
//       image: red,
//       name: "Red Aglaonema",
//       price: 39.99,
//       rating: 4.6,
//       reviews: 156,
//     },
//   ];

//   const plantCareGuides = [
//     {
//       id: 1,
//       title: "How to Care for Indoor Plants",
//       image: indoor,
//       readTime: "5 min read",
//     },
//     {
//       id: 2,
//       title: "Watering Guide for Succulents",
//       image: succulent,
//       readTime: "3 min read",
//     },
//     {
//       id: 3,
//       title: "Best Plants for Beginners",
//       image: flowering,
//       readTime: "4 min read",
//     },
//   ];

//   return (
//     <div className="relative">
//       {/* Hero Section */}
//       <div className="relative">
//         <img
//           className="w-full h-[50vh] md:h-[700px] object-cover"
//           src={back}
//           alt="Background"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-8 md:pl-32 w-full md:w-[800px] max-w-full">
//           <p className="text-white text-3xl sm:text-4xl md:text-5xl font-bold py-2 md:py-4">
//             Bring Nature Home
//           </p>
//           <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
//             Discover the perfect plants for your space. From indoor beauties to
//             outdoor wonders, we have everything you need to create your own
//             green paradise.
//           </p>
//           <form onSubmit={handleSearchSubmit} className="w-full mt-6">
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Search for plants, pots, or gardening tools..."
//               value={searchQuery}
//               onChange={handleSearch}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//                 style: { backgroundColor: "white", borderRadius: "8px" },
//               }}
//             />
//           </form>
//           <Stack className="mt-8" spacing={2} direction="row">
//             <Button
//               variant="contained"
//               className="!bg-green-600 hover:!bg-green-700 text-white !px-8 !py-3 !text-lg"
//               onClick={() => navigate("/shop")}
//             >
//               Shop Now
//             </Button>
//             <Button
//               variant="outlined"
//               className="!border-white !text-white hover:!bg-white hover:!text-green-600 !px-8 !py-3 !text-lg"
//               onClick={() => navigate("/categories")}
//             >
//               Explore Categories
//             </Button>
//           </Stack>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 bg-white">
//         {/* Categories Section */}
//         <div className="flex flex-col items-center my-12 px-4 sm:px-8">
//           <Title text1={"Shop By Category"} />
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-7xl mx-auto">
//             {categories.map((cat) => (
//               <div
//                 key={cat.id}
//                 className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform group"
//                 onClick={() =>
//                   navigate(`/shop?category=${cat.name.toLowerCase()}`)
//                 }
//               >
//                 <img
//                   src={cat.image}
//                   className="w-full h-64 object-cover"
//                   alt={cat.name}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                   <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
//                   <p className="text-sm opacity-90">{cat.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Featured Products */}
//         <div className="flex flex-col items-center my-12 px-4 sm:px-8 bg-gray-50 py-12">
//           <Title text1={"Featured Products"} />
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-7xl mx-auto">
//             {featuredProducts.map((product) => (
//               <Card
//                 key={product.id}
//                 className="hover:shadow-xl transition-shadow"
//               >
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.image}
//                   alt={product.name}
//                   className="h-64 object-cover"
//                 />
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     className="font-bold"
//                   >
//                     {product.name}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     color="primary"
//                     className="font-bold mt-2"
//                   >
//                     ${product.price}
//                   </Typography>
//                   <Box className="flex items-center mt-2">
//                     <FaRegStar className="text-yellow-400 mr-1" />
//                     <Typography variant="body2" color="text.secondary">
//                       {product.rating} ({product.reviews} reviews)
//                     </Typography>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     className="mt-4"
//                     onClick={() => handleBuyNow(product)}
//                   >
//                     Add to Cart
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Plant Care Guides */}
//         <div className="flex flex-col items-center my-12 px-4 sm:px-8">
//           <Title text1={"Plant Care Guides"} />
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-7xl mx-auto">
//             {plantCareGuides.map((guide) => (
//               <Card
//                 key={guide.id}
//                 className="hover:shadow-xl transition-shadow cursor-pointer"
//               >
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={guide.image}
//                   alt={guide.title}
//                   className="h-48 object-cover"
//                 />
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     className="font-bold"
//                   >
//                     {guide.title}
//                   </Typography>
//                   <Box className="flex items-center mt-2">
//                     <FaRegClock className="text-gray-500 mr-1" />
//                     <Typography variant="body2" color="text.secondary">
//                       {guide.readTime}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-40 my-12 gap-8 md:gap-20 bg-gray-50 py-12">
//           <div className="flex flex-col gap-4 items-center text-center">
//             <FaTruck className="text-4xl text-green-600" />
//             <p className="font-bold text-2xl">Free Shipping</p>
//             <p className="text-base">Free shipping on all orders over $50</p>
//           </div>

//           <div className="flex flex-col gap-4 items-center text-center">
//             <FaLeaf className="text-4xl text-green-600" />
//             <p className="font-bold text-2xl">Expert Care</p>
//             <p className="text-base">Detailed care guides for all plants</p>
//           </div>

//           <div className="flex flex-col gap-4 items-center text-center">
//             <FaShieldAlt className="text-4xl text-green-600" />
//             <p className="font-bold text-2xl">Plant Guarantee</p>
//             <p className="text-base">30-day plant health guarantee</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
