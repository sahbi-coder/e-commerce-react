import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWhishlistDb } from "../apiCalls";
import { addToList } from "../redux/wishlistSlice";

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
  margin: 5px;
  background-color: #f5fbfd;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
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
  flex: 9;
`;
const Title = styled.div`
  padding: 5px;
`;

const Price = styled.div`
  padding: 5px;
`;

const Product = ({ item }) => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addToWhishlist = async (user, item) => {
    const responseStatus = await addToWhishlistDb(user, item);
    if (responseStatus === 200) {
      dispatch(addToList(item));
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
        <Icon
          onClick={() => {
            addToWhishlist(user, item);
          }}
        >
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
