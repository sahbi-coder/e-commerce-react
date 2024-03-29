import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCart, getProduct } from "../apiCalls";
import { addProduct, start, success, failure } from "../redux/cartSlice";
import Loading from "../components/Loading";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
  margin-top: 105px;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleAmount = (type) => {
    if (type === "add") {
      return setAmount((amount) => amount + 1);
    }

    if (amount > 1) setAmount((amount) => amount - 1);
  };

  useEffect(() => {
    const reactGetProduct = async (id) => {
      const res = await getProduct(id);
      if (res.request.status === 200) {
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      }
    };
    reactGetProduct(id);
  }, []);

  const reduxHandleCart = async (product, user, amount, size, color) => {
    if (!user.currentUser) {
      return navigate("/login");
    }
    dispatch(start());
    try {
      const res = await handleCart(product, user, amount, size, color);
      if (res.request.status === 200) {
        dispatch(success());
        return dispatch(
          addProduct(res.data.products[res.data.products.length - 1])
        );
      }
      dispatch(failure());
    } catch {
      dispatch(failure());
    }
  };
  return (
    <Loading>
      <Container>
        <Navbar />

        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>{`$ ${product.price}`}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color
                  ? product.color.map((c) => {
                      return (
                        <FilterColor
                          key={c}
                          color={c}
                          onClick={() => {
                            setColor(c);
                          }}
                        />
                      );
                    })
                  : null}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  {product.size
                    ? product.size.map((s) => {
                        return <FilterSizeOption key={s}>{s}</FilterSizeOption>;
                      })
                    : null}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleAmount("remove")} />
                <Amount>{amount}</Amount>
                <Add onClick={() => handleAmount("add")} />
              </AmountContainer>
              <Button
                onClick={() => {
                  reduxHandleCart(product, user, amount, size, color);
                }}
                disabled={cart.isFetching}
              >
                ADD TO CART
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>

        <Footer />
      </Container>
    </Loading>
  );
};

export default Product;
