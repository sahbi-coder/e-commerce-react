import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import AllCategories from "../components/AllCategories";
import { useEffect, useState } from "react";
import ProductsSlider from "../components/ProcuctsSlider";

const Title = styled.h4`
  font-size: 32px;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 105px;
`;

function Categories({products}) {
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
      <Container>
        <Title>Shop By Category</Title>
        <AllCategories />
      <ProductsSlider title="latest products" products={newest} />
      </Container>

      <Footer />
    </>
  );
}

export default Categories;
