import React from "react";
import { allCategories } from "../data";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {mobile} from '../responsive'
const Gallery = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: 10px 0;
  grid-template-columns: repeat(auto-fit, minMax(350px, 1fr));
  width:100%;
  ${mobile({width:'100vw'})}

`;
const GridItem = styled.div`
  height: 400px;
  cursor: pointer;
  position: relative;
`;
const Title = styled.h2`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
function AllCategories() {
  const navigate = useNavigate()
  return (
    <Gallery>
      {allCategories.map((category) => {
        return (
          <GridItem
            onClick={() => {
              navigate(`/products/${category.category}`);
            }}
          >
            <Img src={category.img} />
            <Title>{category.title}</Title>
          </GridItem>
        );
      })}
    </Gallery>
  );
}

export default AllCategories;
