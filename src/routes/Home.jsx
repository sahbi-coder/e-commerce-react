import React,{useRef} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import Categories from "../components/Categories";
import ProductsSlider from "../components/ProductsSlider";
import HomeModal from "../components/HomeModal";
import Loading from "../components/Loading"





function Home() {
 const productsRef = useRef(null)


  return (
    <Loading>
      <Navbar />
      <HomeModal/>
      <Video />
      <Categories />
      <ProductsSlider title="LATEST PRODUCTS" ref= {productsRef} />  
      <ProductsSlider title="MEN'S ACCESSORIES" ctg={'accessories'}  div={'men'} />  
      <ProductsSlider title="WOMEN'S ACCESSORIES" ctg={'accessories'}  div={'women'} />  
      <Footer />
    </Loading>
  );
}

export default Home;
