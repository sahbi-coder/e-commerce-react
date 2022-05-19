import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  position:relative;
 
`;
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;
const Title = styled.h2`
color:white;
margin:20px;`;

const Button = styled.button`
background-color: white;
border:none;
outline:none;
cursor:pointer;
padding: 5px;

`;
const Info = styled.div`
position:absolute;
height:100%;
width:100%;
top:0;
left:0;
display: flex;
justify-content:center;
align-items:center;
flex-direction:column;

`;

function Category({ category }) {
  
  return (
    <Container>
      <Link to={`products/${category.category}`}>
      <Image src={category.img} />
      <Info>
        <Title>{category.title}</Title>
       
        <Button>shop now</Button>
      </Info>
      </Link>
    </Container>
  );
}

export default Category;
