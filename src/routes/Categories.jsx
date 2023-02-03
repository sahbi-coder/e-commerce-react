import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import AllCategories from "../components/AllCategories";
import Loading from "../components/Loading";
import ProductsSlider from "../components/ProductsSlider";

const Title = styled.h4`
  font-size: 32px;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 105px;
`;

function Categories() {


  return (
    <Loading>
      <Navbar />
      <Container>
        <Title>Shop By Category</Title>
        <AllCategories />
        <ProductsSlider title="LATEST PRODUCTS" />
        <ProductsSlider title="ACCESSORIES" ctg={"accessories"} />
      </Container>

      <Footer />
    </Loading>
  );
}

export default Categories;
