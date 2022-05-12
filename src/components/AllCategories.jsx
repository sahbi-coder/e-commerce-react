import React from "react";
import { allCategories } from "../data";
import styled from "styled-components";

const Gallery = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: 10px 0;
  grid-template-columns: repeat(auto-fit, minMax(350px, 1fr));
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
  return (
    <Gallery>
      {allCategories.map((category) => {
        return (
          <GridItem>
            {/* <img
              src={category.img}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            /> */}
            <Img src={category.img}/>
            <Title>{category.title}</Title>
          </GridItem>
        );
      })}
    </Gallery>
  );
}

export default AllCategories;
