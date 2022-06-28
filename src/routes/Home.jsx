import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductsSlider from "../components/ProcuctsSlider";
import { useEffect, useState } from "react";



function Home({products}) {
 
  const [newest, setNewest] = useState([]);
 
  useEffect(() => {
    setNewest(
      products.sort(
        (a, b) =>
          -new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime()
      ).slice(0,8)
    );
  }, [products]);
  return (
    <>
      <Navbar />
      <Slider />
      <Categories />
      <ProductsSlider title="latest products" products={newest} />
      
      <Footer />
    </>
  );
}

export default Home;
