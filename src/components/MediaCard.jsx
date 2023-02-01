import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Price = styled.span``;

export default function MediaCard({ product }) {
    const navigate = useNavigate()
  
  return (
    <Card sx={{ height:'60vh',minHeight:'60vh',width:'280px',margin:1 }}  >
      <CardMedia
        component="img"
       
        image={product.img}
        alt="image"
        style={{ objectFit: "fit"}}
        width='100%'
        height={'80%'}

        
      />
      <CardContent sx={{padding:2,fontSize:11}}>
        <Typography gutterBottom variant="p" component="div" >
          {product.title.split('-')[0]}
        </Typography>
        <Price>${product.price}</Price>
        <Button
          size="small"
          onClick={() => {
            navigate(`/product/${product._id}`);
          }}
        >
          Buy
        </Button>
     
      </CardContent >
  
    </Card>
  );
}
