import { Add, ClearAll, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeOrder } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { deleteById, deleteAll } from "../redux/wishlistSlice";
import { userRequest } from "../requestMethods";
const Container = styled.div`
  margin-top: 100px;
`;

const Wrapper = styled.div`
  padding: 20px;
  margin: 100px 0;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px black solid;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { cart, user, whishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCart, setIsCart] = useState(true);

  const removeFromDbCart = async (id) => {
    if (user.currentUser) {
      try {
        let res = await userRequest.get("/carts/find/" + user.currentUser._id);
        const temp = res.data.products.reduce((pre, acc) => {
          if (acc._id === id) {
            return pre;
          }
          pre.push(acc);
          return pre;
        }, []);
        await userRequest.put("/carts/" + res.data._id, {
          ...res.data,
          products: temp,
        });
        dispatch(removeOrder(id));
      } catch {}
    }
  };
  const clearDbCart = async () => {
    if (user.currentUser) {
      try {
        let res = await userRequest.get("/carts/find/" + user.currentUser._id);

        await userRequest.put("/carts/" + res.data._id, {
          ...res.data,
          products: [],
        });
        dispatch(clearCart());
      } catch {}
    }
  };
  const removeFromDbList=async(id)=>{
    if (user.currentUser) {
      try {
        let res = await userRequest.get("/wishlists/find/" + user.currentUser._id);

        const temp = res.data.products.reduce((pre, acc) => {
          if (acc._id === id) {
            return pre;
          }
          pre.push(acc);
          return pre;
        }, []);
        await userRequest.put("/wishlists/" + res.data._id, {
          ...res.data,
          products: temp,
        });
        dispatch(deleteById(id));
      } catch {}
    }
   
  }
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            CONTINUE SHOPPING
          </TopButton>
          {user.currentUser && (
            <>
              <TopTexts>
                <TopText
                  onClick={() => {
                    setIsCart(true);
                  }}
                >
                  Shopping Bag({cart.products.length})
                </TopText>
                <TopText
                  onClick={() => {
                    setIsCart(false);
                  }}
                >
                  Your Wishlist ({whishlist.products.length})
                </TopText>
              </TopTexts>
              <TopButton
                type="filled"
                onClick={(e) => {
                  e.preventDefault();
                  clearDbCart();
                }}
              >
                CLEAR ALL
              </TopButton>
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </>
          )}
          {!user.currentUser && (
            <TopButton
              type="filled"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </TopButton>
          )}
        </Top>
        {user.currentUser && isCart && (
          <Bottom>
            <Info>
              {cart.products.map((prod) => {
                return (
                  <>
                    <Product>
                      <ProductDetail>
                        <Image src={prod.img} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {prod.title}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {prod._id}
                          </ProductId>
                          <ProductColor color={prod.color} />
                          <ProductSize>
                            <b>Size:</b> {prod.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add />
                          <ProductAmount>{prod.amount}</ProductAmount>
                          <Remove />
                        </ProductAmountContainer>
                        <ProductPrice>
                          $ {prod.price * prod.amount}
                        </ProductPrice>
                      </PriceDetail>
                      <Details>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromDbCart(prod._id);
                          }}
                        >
                          delete
                        </Button>
                      </Details>
                    </Product>
                    <Hr />
                  </>
                );
              })}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        )}
        {user.currentUser && !isCart && (
          <Bottom>
            <Info>
              {whishlist.products.map((prod) => {
                return (
                  <>
                    <Product>
                      <ProductDetail>
                        <Image src={prod.img} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {prod.title}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {prod._id}
                          </ProductId>
                        </Details>
                      </ProductDetail>
                      <ProductDetail>
                        <Details>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/product/${prod._id}`);
                            }}
                          >
                            add to cart
                          </Button>
                        </Details>
                        <Details>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromDbList(prod._id)
                            }}
                          >
                            delete
                          </Button>
                        </Details>
                      </ProductDetail>
                    </Product>
                    <Hr />
                  </>
                );
              })}
            </Info>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
