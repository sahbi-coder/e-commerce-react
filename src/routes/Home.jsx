import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from '../components/Products'

function Home() {
  return (
    <>
      <Navbar />
      <Slider/>
      <Categories/>
      <Products/>
      <Footer />
    </>
  );
}

export default Home;
