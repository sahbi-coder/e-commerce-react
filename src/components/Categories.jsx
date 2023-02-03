import { categories } from "../data";
import styled from "styled-components";
import Category from "./Category";
import { mobile } from "../responsive";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const imagesRefs = useRef([]);

  const setRefs = (el) => {
    imagesRefs.current.push(el);
  };
  useLayoutEffect(() => {
    imagesRefs.current.forEach((ref) => {
      gsap.to(ref, { opacity: 0, duration: 0 });
    });
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) {
      const timelines = [];
      imagesRefs.current.forEach((trigger) => {
        const t = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top center",
          },
        });
        timelines.push(t);
      });

      timelines.forEach((t, index) => {
        t.to(imagesRefs.current[index], { opacity: 1 });
      });
    } else {
      const t = gsap.timeline({
        scrollTrigger: {
          trigger: imagesRefs.current[0],
          start: "top center",
        },
      });
      imagesRefs.current.forEach((ref) => {
        t.to(ref, { opacity: 1 });
      });
    }
  }, []);
  return (
    <>
      <Title>CATEGORIES</Title>
      <Container>
        {categories.map((category) => {
          return (
            <Category category={category} key={category.id} setRefs={setRefs} />
          );
        })}
      </Container>
    </>
  );
}

export default Categories;
