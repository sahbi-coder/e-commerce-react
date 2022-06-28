import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  width: 100%;
  ${mobile({ width: "100vw" })};
`;
const TitleContainer = styled.div`
  text-align: center;
  margin: 105px 12px;
`;
const TitleDesc = styled.p`
  margin-top: 32px;
`;
const Title = styled.h4`
  font-size: 32px;
`;
const MainContainer = styled.div`
  padding: 40px;
  text-align: center;
`;
const FooterContainer = styled.div`
  text-align: end;
  padding: 25px;
  padding: 0 60px;
`;

const Gallery = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minMax(250px, 1fr));
  padding: 10px 50px;
  ${mobile({ padding: 0 })}
`;
const GridItem = styled.div`
  height: 400px;
`;

function About() {
  return (
    <>
      <TitleContainer>
        <Title>Quality, not quantity</Title>
        <TitleDesc>
          We have made quality our habit. It’s not something that we just strive
          for, we live by this principle every day.
        </TitleDesc>
      </TitleContainer>

      <Gallery>
        <GridItem>
          <img
            src="https://source.unsplash.com/FpPcoOAk5PI/640x960"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </GridItem>
        <GridItem>
          <img
            src="https://source.unsplash.com/mwa_nzFpnJw/640x960"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </GridItem>
        <GridItem>
          <img
            src="https://source.unsplash.com/W-7k72ThEr0/640x1137"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </GridItem>
      </Gallery>

      <MainContainer>
        Our mission is to provide a trusted and experienced online resource for
        the retail community. We are committed to providing our members with a
        wide range of products and services. This allows you to shop with
        confidence knowing you are shopping with a trusted brand that knows and
        understands the marketplace. We do this by delivering a wide selection
        of products and services that are tailored to fit your lifestyle. The
        company is founded by sahbi kardi, who have a keen interest fashion. his
        aim is to provide the best possible shopping experience for customers
        and to support the companies that do. sahbi is passionate about fashion
        and the role it plays in the lives of people.
      </MainContainer>
      <FooterContainer>With love, Sahbi</FooterContainer>
    </>
  );
}

export default About;
