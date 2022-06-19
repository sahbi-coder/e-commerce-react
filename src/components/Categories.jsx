import React from "react";
import { categories } from "../data";
import styled from "styled-components";
import Category from "./Category";
import { mobile } from "../responsive";

const Container = styled.section`
  display: flex;
  width: 100%;
  ${mobile({flexDirection:'column',width:'100vw'})}


`;
function Categories() {
  return (
    <Container>
      {categories.map((category) => {
        return <Category category={category} />;
      })}
    </Container>
  );
}

export default Categories;
