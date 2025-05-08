import { useState } from "react";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Categories from "./Pages/Categories";
import Contact from "./Pages/Contact";
import Cartitem from "./Pages/Cartitem";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cartitem" element={<Cartitem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
