// import React from "react";
// import { useParams } from "react-router-dom";
// import Title from "./Title";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

// const Product = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Sample product data - replace with your actual data source
//   const products = [
//     {
//       id: "bonsai",
//       name: "Bonsai",
//       price: 89.99,
//       image:
//         "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
//       description:
//         "A beautiful bonsai tree that brings peace and tranquility to any space. Perfect for indoor decoration and meditation.",
//       category: "Bonsai",
//       care: "Water when soil is dry, keep in bright indirect light",
//       size: "Small (6-8 inches)",
//     },
//     {
//       id: "herbs",
//       name: "Herbs",
//       price: 24.99,
//       image:
//         "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
//       description:
//         "Fresh herbs for cooking and wellness. Grow your own herbs for culinary and medicinal purposes.",
//       category: "Herbs",
//       care: "Water regularly, keep in sunny spot",
//       size: "Medium (8-12 inches)",
//     },
//     {
//       id: "pink",
//       name: "Pink Plant",
//       price: 39.99,
//       image:
//         "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
//       description:
//         "A stunning pink plant that adds a pop of color to any room. Perfect for brightening up your space.",
//       category: "Indoor",
//       care: "Water weekly, indirect sunlight",
//       size: "Medium (10-12 inches)",
//     },
//     {
//       id: "red",
//       name: "Red Plant",
//       price: 34.99,
//       image:
//         "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
//       description:
//         "A vibrant red plant that makes a bold statement. Great for adding color to your home or office.",
//       category: "Indoor",
//       care: "Water when soil is dry, bright indirect light",
//       size: "Small (6-8 inches)",
//     },
//   ];

//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <Title text1="Product Not Found" />
//         <div className="text-center mt-8">
//           <p className="text-gray-600 mb-4">
//             Sorry, the product you're looking for doesn't exist.
//           </p>
//           <Button
//             variant="contained"
//             className="!bg-green-600 hover:!bg-green-700 text-white"
//             onClick={() => navigate("/shop")}
//           >
//             Back to Shop
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[400px] object-cover"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//             <p className="text-2xl font-semibold text-green-600 mt-2">
//               ${product.price.toFixed(2)}
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Description</h2>
//             <p className="text-gray-600">{product.description}</p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Care Instructions</h2>
//             <p className="text-gray-600">{product.care}</p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Size</h2>
//             <p className="text-gray-600">{product.size}</p>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               variant="contained"
//               className="!bg-green-600 hover:!bg-green-700 text-white flex-1"
//               onClick={() => {
//                 // Add to cart functionality
//                 alert("Added to cart!");
//               }}
//             >
//               Add to Cart
//             </Button>
//             <Button
//               variant="outlined"
//               className="!border-green-600 !text-green-600 hover:!bg-green-50 flex-1"
//               onClick={() => {
//                 // Buy now functionality
//                 alert("Proceeding to checkout!");
//               }}
//             >
//               Buy Now
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
