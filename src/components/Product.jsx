import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../redux/wishlistSlice";
import { publicRequest, userRequest } from "../requestMethods";
import { mobile } from "../responsive";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin:5px;
  background-color: #f5fbfd;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items:stretch ;
 position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;



const Image = styled.img`
  
  object-fit: center;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Footer = styled.div` 
  background-color: white;
  flex:9;
`;
const Title  = styled.div`
  padding: 5px;
`

const Price  = styled.div`
   padding: 5px;
   
`



const Product = ({ item }) => {
  const { user } = useSelector((state) => state);
  const dispatsh = useDispatch();
  const addToWhishlist = async (e) => {
    e.preventDefault();
    if (user.currentUser) {
      try {
        const res = await userRequest.get(
          "/wishlists/find/" + user.currentUser._id
        );
        const products = res.data.products
        const isInList = res.data.products.reduce((pre, acc) => {
          if (acc._id === item._id) {
            return true;
          }
          return pre;
        }, false);
        if (!isInList) {
          await userRequest.put("/wishlists/" + res.data._id, {
            products: [...products, item],
          });
          dispatsh(addToList({ product: item }));
        }
      } catch {}
    }
  };
  return (
    <Container>
     
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon onClick={addToWhishlist}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
      <Footer>
        <Title>{item.title}</Title>
      
        
        <Price>${item.price}</Price>
        
         
        
        
      </Footer>
    </Container>
  );
};

export default Product;
