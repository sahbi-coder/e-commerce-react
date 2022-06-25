import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import {useState} from "react"
import { useLocation } from "react-router-dom";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const [filters,setFilters]=useState({})
  const [sort,setSort]=useState('')
  const location = useLocation()
  const ctg = location.pathname.split('/')[2]


 
  const handleChange=(e)=>{
     setFilters({...filters,[e.target.name]:e.target.value})
    
  }
  const handleSort = (e)=>{
    setSort(e.target.value)
    
  }
  return (
    <Container>
      <Navbar />
     
      <Title>{ctg}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select onChange={handleChange} name='color' >
            <Option   disabled>
              Color
            </Option>
            <Option>all</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>brown</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>pink</Option>
            <Option>orange</Option>
            <Option>grey</Option>
            <Option>silver</Option>
          </Select>
          <Select onChange={handleChange} name='size' >
            <Option   disabled>
              Size
            </Option>
            <Option>all</Option>
            <Option>xs</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value='Newest'>Newest</Option>
            <Option value='ASD'> Price (asc)</Option>
            <Option value='DSD'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products ctg={ctg} sort={sort} filters={filters} itemsPerPage={20}/>
 
      <Footer />
    </Container>
  );
};

export default ProductList;