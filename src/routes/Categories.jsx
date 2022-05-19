import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import AllCategories from "../components/AllCategories";
const Title = styled.h4`
  font-size: 32px;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 105px;
`;

function Categories() {
  return (
    <>
      <Navbar />
      <Container>
        <Title>Shop By Category</Title>
        <AllCategories />
      </Container>

      <Footer />
    </>
  );
}

export default Categories;
