import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import Categories from "../components/Categories";
import ProductsSlider from "../components/ProductsSlider";
import HomeModal from "../components/HomeModal";





function Home() {


  return (
    <>
      <Navbar />
      <HomeModal/>
      <Video />
      <Categories />
      <ProductsSlider title="LATEST PRODUCTS"  />  
      <Footer />
    </>
  );
}

export default Home;
