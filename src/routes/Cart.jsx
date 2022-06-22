import { Add, Remove } from "@material-ui/icons";
import styled from 'styled-components'
import{ mobile} from '../responsive'
import{useDispatch,useSelector}from 'react-redux'
import {useNavigate} from'react-router-dom'
import { userRequest } from "../requestMethods";
import { clearCart, removeOrder } from "../redux/cartSlice";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" ,width:'100vw'})}
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
  ${mobile({ flexDirection: "column",alignItems:'center' })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ flexDirection: "column"})}

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
  height:60vh;
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
  const removeFromDbCart = async (id) => {
    console.log(id)
    if (user.currentUser) {
      try {
        let res = await userRequest.get("/carts/find/" + user.currentUser._id);
        const temp = res.data.products.reduce((pre, acc) => {
          console.log(acc._id)
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
 
return(
  <>
  {user.currentUser && (
    <Container>
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
                      removeFromDbCart(prod.id);
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
    </Container> 
  )}
  </>
)
};

export default Cart;
