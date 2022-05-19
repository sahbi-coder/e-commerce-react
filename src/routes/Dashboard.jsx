import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logOut, init } from "../redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { deleteAll } from "../redux/wishlistSlice";

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
const GridItem = styled.div`
  border: 2px #514f4d solid;
  padding: 10px;
`;
const Title = styled.h4`
  text-align: start;
`;
const PageTitle = styled.h2`
  text-align: center;
`;
function Dashboard() {
  const whishlist = useSelector((state) => state.whishlist);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>My Account</PageTitle>
        <ButtonsWrapper>
          {user.currentUser && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(logOut());
                dispatch(clearCart());
                dispatch(deleteAll())
              }}
            >
              log out
            </Button>
          )}
          {!user.currentUser && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              log in
            </Button>
          )}
        </ButtonsWrapper>
        <Grid>
          <GridItem>
            <Title>Profile</Title>
            {/* {user} */}
            {!user.currentUser && "none"}
          </GridItem>
          <GridItem>
            <Title>Wishlist</Title>
            {/* {whishlist} */}
            {!user.currentUser && "empty"}
          </GridItem>

          <GridItem>
            <Title>Cart</Title>
            {/* {cart} */}
            {!user.currentUser && "empty"}
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
