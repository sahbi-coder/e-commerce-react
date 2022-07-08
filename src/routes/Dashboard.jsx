import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logOut} from "../redux/userSlice";

import { useNavigate } from "react-router-dom";
import ProfileContainer from "../components/ProfileContainer";
import WishlistContainer from "../components/WishlistContainer";
import CartContainer from "../components/CartContainer";
import OrderContainer from "../components/OrderContainer";
import { clearCart } from "../redux/cartSlice";
import { deleteAll } from "../redux/wishlistSlice";
import { clearOrders, removeOrderToAdd } from "../redux/orderSlice";




const PageTitle = styled.h2`
  text-align: center;
`;

const Container = styled.div`
  margin: 105px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
`;
const Button = styled.button`
  padding: 5px 10px;
  color: white;
  background-color: black;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(270px, 1fr));
  grid-gap: 20px;
  grid-template-rows: minMax(250px, auto);
  padding: 5px;
`;

function Dashboard() {
  const wishlist = useSelector((state) => state.whishlist);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const logoutUser = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(deleteAll());
    dispatch(clearOrders())
    dispatch(removeOrderToAdd())
  };


  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>My Account</PageTitle>
        <ButtonsWrapper>
          {user.currentUser && (
            <Button
              onClick={() => {
                logoutUser();
              }}
            >
              log out
            </Button>
          )}
          {!user.currentUser && (
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              log in
            </Button>
          )}
        </ButtonsWrapper>
        <Grid>
          <ProfileContainer user={user} />
          <WishlistContainer wishlist={wishlist} user={user} />
          <CartContainer user={user} cart={cart}/>
          <OrderContainer user={user} order={order}/>
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
