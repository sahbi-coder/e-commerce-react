import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile,extraSmall } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteById} from "../redux/wishlistSlice";
import { userRequest } from "../requestMethods";
import { Outlet } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  ${mobile({ width:'100vw'})}
`;

const Wrapper = styled.div`
  padding: 20px;
  margin: 125px 0;
  ${mobile({ padding: 0 })}
  width:100%;
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
  ${mobile({flexDirection:'column'})}
  width:100%;
`;

const TopButton = styled.button`
  padding: 5px;
  ${mobile({ padding: 2})}
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  margin: 0 2px;
  ${mobile({ margin:'2px 2px' })}
`;

const TopTexts = styled.div`
  ${mobile({ margin:'5px' })}
  ${extraSmall({display:'flex',flexDirection:'column'})}

`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const ButtonWrap = styled.div`
     ${mobile({ display: "flex" ,flexDirection:'column'})}
`



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
                    navigate('/cart')
                  }}
                >
                  Shopping Bag({cart.products.length})
                </TopText>
                <TopText
                  onClick={() => {
                    navigate('/whishlist')
                  }}
                >
                  Your Wishlist ({whishlist.products.length})
                </TopText>
              </TopTexts>
              <ButtonWrap>

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
              </ButtonWrap>
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
        <Outlet />
   
      
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;