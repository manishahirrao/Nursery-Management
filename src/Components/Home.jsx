import React from "react";
import bg from "../assets/bg.jpeg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Title from "../Pages/Title";
import pink from "../assets/pink.jpeg";
import purple from "../assets/purple.jpeg";
import red from "../assets/red.jpeg";
import indoor from "../assets/indoor.jpeg";

const Home = () => {
  const item = [
    {
      id: "1",
      image: pink,
    },
    {
      id: "2",
      image: purple,
    },
    {
      id: "3",
      image: red,
    },
    {
      id: "4",
      image: indoor,
    },
  ];

  return (
    <>
      <img className="w-full h-[600px]" src={bg}></img>
      <div className="absolute inset-0 flex flex-col items-start justify-center pl-32 w-[800px]">
        <p className="text-white text-4xl font-bold py-4 bg-opacity-50 ">
          Welcome to Nursery
        </p>
        <p className="text-white text-xl font-semibold  bg-opacity-50 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
          quos, molestiae recusandae accusamus accusantium sit facilis tempore
          beatae possimus amet ipsa inventore earum atque asperiores illum
          nihil, perspiciatis magnam numquam?
        </p>
        <Stack className="mt-8" spacing={2} direction="row">
          <Button
            variant="contained"
            className="!bg-green-600 hover:!bg-green-700 text-white"
          >
            Shop Now
          </Button>
        </Stack>
      </div>

      {/* shop by category */}
      <div className="flex flex-col items-center my-4">
        <Title text1={"Shop By Category"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {item.map((cat) => (
            <div
              key={cat.id}
              className="w-48 h-48 rounded-lg overflow-hidden shadow-md"
            >
              <img src={cat.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* products */}

      <div className="flex flex-col items-center my-4">
        <Title text1={"Featured Products"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {item.map((cat) => (
            <div
              key={cat.id}
              className="w-48 h-48 rounded-lg overflow-hidden shadow-md"
            >
              <img src={cat.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* shipping,care guide,guarantee */}

      <div className="flex items-center justify-between px-40 my-20 gap-20">
        <div className="flex flex-col gap-1 items-center ">
          {/* image */}
          <p className="font-semibold text-2xl ">Free Shipping</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi</p>
        </div>

        <div className="flex flex-col gap-1 items-center ">
          {/* image */}
          <p className="font-semibold text-2xl ">Plant Care</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi</p>
        </div>

        <div className="flex flex-col gap-1 items-center ">
          {/* image */}
          <p className="font-semibold text-2xl ">Guarantee</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi</p>
        </div>
      </div>
    </>
  );
};

export default Home;
