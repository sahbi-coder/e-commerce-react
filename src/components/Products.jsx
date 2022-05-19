import styled from "styled-components";

import Product from "./Product";
import { useEffect,useState } from "react";
import { publicRequest } from "../requestMethods";
import { mobile} from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;
    ${mobile({padding:0})}

  
`;

const Products = ({ctg,sort,filters}) => {
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
  const division = useSelector((state)=>state.division.division)
  
  useEffect(()=>{
   async  function getProducts(){
     try{
   
       const res = await publicRequest.get(ctg?`/products/?category=${ctg}&division=${division}`:'/products')
       setProducts(res.data)
   
     }
     catch(e){
   
       console.log(e)
     }
 
   }
    getProducts()
  },[ctg,division])
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