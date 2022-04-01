import styled from "styled-components";

import Product from "./Product";
import { useEffect,useState } from "react";
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ctg,sort,filters}) => {
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])

  useEffect(()=>{
   async  function getProducts(){
     try{
   
       const res = await axios.get(ctg?`http://localhost:5000/api/products/?category=${ctg}`:'http://localhost:5000/api/products')
       setProducts(res.data)
   
     }
     catch(e){
   
       console.log(e)
     }
 
   }
    getProducts()
  },[ctg])
 useEffect(()=>{
   
   ctg &&setFilteredProducts(products.filter(prod=>{
      return Object.entries(filters).every(([key,value])=>{
       
    
        return  prod[key].includes(value)
     })
    
   }))
   
   
  },[ctg,filters,products])
 useEffect(()=>{
   
  if(sort==='Newest'){
    setFilteredProducts(prev=>
          [...prev].sort((a,b)=>a.createdAt-b.createdAt)
    )
  }
  if(sort==='ASD'){
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>a.price-b.price)
    )
  }
  if(sort==='DSD'){
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>b.price-a.price)
    )
  }
   
   
  },[sort])

  return (
    <Container>
      {ctg?filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )):products.slice(0,8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;