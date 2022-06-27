import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import MediaCard from "./MediaCard";

import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Container = styled.div`
  width: 100%;
  ${mobile({ width: "100vw" })}
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CarouselContainer = styled.div`
  width:100%;
  padding:20px;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

function ProductsSlider({ title, products }) {
  return (
    <Container>
      <Title>{title}</Title>
      <CarouselContainer>
        <Carousel breakPoints={breakPoints} style={{height:'90vh'}}>
          {products &&
            products.map((item, index) => {
              return <MediaCard product={item} key={item._id} />;
            })}
        </Carousel>
      </CarouselContainer>
    </Container>
  );
}

export default ProductsSlider;
