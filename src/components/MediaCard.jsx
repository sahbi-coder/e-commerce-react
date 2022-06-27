import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
    <Card sx={{ maxWidth: 345,height:'70vh',margin:2,width:'280px' }} >
      <CardMedia
        component="img"
        height='75%'
        image={product.img}
        alt="green iguana"
        style={{ objectFit: "cover" }}
      />
      <CardContent sx={{padding:2,fontSize:11}}>
        <Typography gutterBottom variant="p" component="div" >
          {product.title.split('-')[0]}
        </Typography>
     
      </CardContent >
      <CardActions sx={{padding:2}}>
        <Price>${product.price}</Price>
        <Button
          size="small"
          onClick={() => {
            navigate(`/product/${product._id}`);
          }}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
