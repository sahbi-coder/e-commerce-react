import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import MediaCard from "./MediaCard";
import Carousel from "react-elastic-carousel";
import { getProductsApiCall } from "../apiCalls";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;

  ${mobile({ width: "100vw" })}
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CarouselContainer = styled.div`
  width: 95%;
  padding: 10px;
  background-color: #f7eee3;
  margin-bottom: 50px;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

export default function ProductsSlider({ title, ctg, div }) {
  const [products, setProducts] = useState([]);
  const ref = useRef(null);

  const getProducts = async () => {
    const res = await getProductsApiCall(ctg, div);
    if (res.request.status === 200) {
      setProducts(res.data.products);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  useLayoutEffect(() => {
    gsap.to(ref.current, { opacity: 0 });
  }, []);

  useEffect(() => {
    const t = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
      },
    });

    t.to(ref.current, { opacity: 1 });
  }, []);
  return (
    <Container ref={ref}>
      <Title>{title}</Title>
      <CarouselContainer>
        <Carousel breakPoints={breakPoints}>
          {products &&
            products.map((item, index) => {
              return <MediaCard product={item} key={item._id} />;
            })}
        </Carousel>
      </CarouselContainer>
    </Container>
  );
}
