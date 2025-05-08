import React from "react";
import Title from "./Title";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import indoor from "../assets/indoor.jpeg";
import outdoor from "../assets/outdoor.jpeg";
import flowering from "../assets/flowering.jpeg";
import succulent from "../assets/succulent.jpeg";
import herbs from "../assets/herbs.jpeg";
import bonsai from "../assets/bonsai.jpeg";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Indoor Plants",
      image: indoor,
      description: "Perfect for home and office spaces",
      category: "Indoor",
    },
    {
      id: 2,
      title: "Outdoor Plants",
      image: outdoor,
      description: "Enhance your garden and landscape",
      category: "Outdoor",
    },
    {
      id: 3,
      title: "Flowering Plants",
      image: flowering,
      description: "Add color and beauty to your space",
      category: "Flowering",
    },
    {
      id: 4,
      title: "Succulents",
      image: succulent,
      description: "Low maintenance, high style",
      category: "Succulent",
    },
    {
      id: 5,
      title: "Herbs",
      image: herbs,
      description: "Fresh herbs for cooking and wellness",
      category: "Herbs",
    },
    {
      id: 6,
      title: "Bonsai",
      image: bonsai,
      description: "Miniature trees with artistic appeal",
      category: "Bonsai",
    },
  ];

  const handleExplore = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <div className="container mx-auto px-20 py-8">
      <Title text1="Plant Categories" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
              <Stack className="mt-8" spacing={2} direction="row">
                <Button
                  variant="contained"
                  className="!bg-green-600 hover:!bg-green-700 text-white"
                  onClick={() => handleExplore(category.category)}
                >
                  Explore
                </Button>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
