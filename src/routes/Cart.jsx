import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromDbCart,
  addToAmountDb,
  removeAmounfromDb,
} from "../apiCalls";
import {
  removeOrder,
  start,
  success,
  failure,
  addAmount,
  removeAmount,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", width: "100vw" })}
  width:100%;
  flex-wrap: wrap;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  width:100%;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}
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
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginContainer: "20px" })}
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
  height: 60vh;
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
  cursor: pointer;
`;
const SmallButtom = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;
const Cart = () => {
  const { cart, user, whishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const add = async (id, user) => {
    dispatch(start());

    const statusCode = await addToAmountDb(id, user);
    if (statusCode === 200) {
      dispatch(success());
      dispatch(addAmount(id));
      return;
    }
    dispatch(failure());
  };

  const remove = async (id, user) => {
    dispatch(start());

    const statusCode = await removeAmounfromDb(id, user);
    if (statusCode === 200) {
      dispatch(success());
      dispatch(removeAmount(id));
      return;
    }
    dispatch(failure());
  };

  const deleteOne = async (id, user) => {
    dispatch(start());

    const statusCode = await removeFromDbCart(id, user);
    if (statusCode === 200) {
      dispatch(success());
      dispatch(removeOrder(id));
      return;
    }
    dispatch(failure());
  };

  return (
    <>
      {user.currentUser && (
        <Container>
          <Info>
            {cart.products.map((prod) => {
              return (
                <>
                  <Product key={prod._id}>
                    <ProductDetail>
                      <Image src={prod.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {prod.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {prod.productId}
                        </ProductId>
                        <ProductColor color={prod.color} />
                        <ProductSize>
                          <b>Size:</b> {prod.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <SmallButtom
                          onClick={() => {
                            add(prod._id, user);
                          }}
                          disabled={cart.isFetching}
                        >
                          <Add />
                        </SmallButtom>
                        <ProductAmount>{prod.amount}</ProductAmount>
                        <SmallButtom
                          onClick={() => {
                            remove(prod._id, user);
                          }}
                          disabled={cart.isFetching}
                        >
                          <Remove />
                        </SmallButtom>
                      </ProductAmountContainer>
                      <ProductPrice>$ {prod.price * prod.amount}</ProductPrice>
                    </PriceDetail>
                    <Details>
                      <Button
                        onClick={() => {
                          deleteOne(prod._id, user);
                        }}
                        disabled={cart.isFetching}
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
            <Button
              onClick={() => {
                cart.total && user.currentUser && navigate("/payment/form");
              }}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Container>
      )}
    </>
  );
};

export default Cart;
