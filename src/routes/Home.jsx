import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductsSlider from "../components/ProcuctsSlider";
import { useEffect, useState } from "react";
import { getProductsApiCall } from "../apiCalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [newest, setNewest] = useState([]);
  const getProducts = async () => {
    const p = await getProductsApiCall(null,null);
    setProducts(p);
  };
  useEffect(() => {
    getProducts();
  
  }, []);
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
      {/* <ProductsSlider title='latest prosucts' products={products} /> */}
      <Footer />
    </>
  );
}

export default Home;
