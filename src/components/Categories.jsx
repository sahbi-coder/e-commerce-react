import React from "react";
import { categories } from "../data";
import styled from "styled-components";
import Category from "./Category";
import { mobile } from "../responsive";

const Container = styled.section`
  display: flex;
  width: 100%;
  ${mobile({ flexDirection: "column", width: "100vw" })}
`;
const Title = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;
function Categories() {
  return (
    <>
      <Title>CATEGORIES</Title>
      <Container>
        {categories.map((category) => {
          return <Category category={category} key={category.id} />;
        })}
      </Container>
    </>
  );
}

export default Categories;
