import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { getProductsApiCall } from "../apiCalls";
import { useSelector } from "react-redux";

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
 
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })};
  
`;
const Option = styled.option``;


const placeHolderArray = [
  { _id: 1, title: "", price: 0, img: "", desc: "" },
  { _id: 2, title: "", price: 0, img: "", desc: "" },
  { _id: 3, title: "", price: 0, img: "", desc: "" },
  { _id: 4, title: "", price: 0, img: "", desc: "" },
  { _id: 5, title: "", price: 0, img: "", desc: "" },
  { _id: 6, title: "", price: 0, img: "", desc: "" },
  { _id: 7, title: "", price: 0, img: "", desc: "" },
  { _id: 8, title: "", price: 0, img: "", desc: "" },
  { _id: 9, title: "", price: 0, img: "", desc: "" },
  { _id: 10, title: "", price: 0, img: "", desc: "" },
  { _id: 11, title: "", price: 0, img: "", desc: "" },
  { _id: 12, title: "", price: 0, img: "", desc: "" },
  { _id: 13, title: "", price: 0, img: "", desc: "" },
  { _id: 14, title: "", price: 0, img: "", desc: "" },
  { _id: 15, title: "", price: 0, img: "", desc: "" },
  { _id: 16, title: "", price: 0, img: "", desc: "" },
];

const ProductList = () => {
  const [products, setProducts] = useState(placeHolderArray);
  const [filters, setFilters] = useState({size:'All',color:'All'});
  const [sort, setSort] = useState("");
  const location = useLocation();
  const ctg = location.pathname.split("/")[2];
  const division = useSelector((state) => state.division.division);
  const [colors,setColors] = useState([])

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const getProducts = async () => {
    try {
      const res = await getProductsApiCall(ctg, division);
      if (res.request.status === 200) {
        setProducts(res.data.products);
        setColors(res.data.colors)
      }
    } catch {
      setProducts(placeHolderArray);
      setColors([])
    }
  };
  useEffect(() => {
    getProducts();
  }, [ctg, division]);
  return (
    <Container>
      <Navbar />

      <Title>{ctg}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            onChange={handleChange}
            name="color"
            value={filters.color || "All"}
          
          >
            <Option disabled>Color</Option>
            <Option>All</Option>

            {colors &&
              colors.map((color, index) => {
                return <Option key={crypto.randomUUID()}>{color}</Option>;
              })}
          </Select>
          <Select onChange={handleChange} name="size" style={{maxWidth:50}} value='All'>
            <Option disabled>Size</Option>
            <Option>All</Option>
            <Option>xs</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
            
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort} >
            <Option value="Newest">Newest</Option>
            <Option value="ASD"> Price (asc)</Option>
            <Option value="DSD">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products ctg={ctg} sort={sort} products={products}filters={filters} itemsPerPage={4} />

      <Footer />
    </Container>
  );
};

export default ProductList;
