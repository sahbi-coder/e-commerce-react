import styled from "styled-components";
import { mobile } from "../responsive";
import video from "../videos/mixkit-hand-selecting-through-clothes-23327-medium.mp4";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  ${mobile({ width: "100vw" })}
  margin-top:81px;
  padding: 0;
`;

const Slider = () => {
  return (
    <Container>
      <video
        id="myVideo"
        width={{ height: "100vh", width: "100vw" }}
        autoPlay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
      </video>
    </Container>
  );
};

export default Slider;
