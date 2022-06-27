import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logOut, init } from "../redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  start,
  success,
  failure,
  addAmount,
  removeAmount,
  clearCart
} from "../redux/cartSlice";
import { deleteAll } from "../redux/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { removeAmounfromDb, addToAmountDb } from "../apiCalls";

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
  font-size: 28px;
`;
const PageTitle = styled.h2`
  text-align: center;
`;
const ProfileRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const ProfileRowTitle = styled.div`
  font-weight: bold;
`;
const ProfileRowInfo = styled.div``;
const ProfileRows = styled.div``;
const WishlistRows = styled.div``;
const WishlistRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 5px 0;
`;
const WishlistImage = styled.img`
  width: 80px;
  height: 100px;
`;
const WishlistDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const WishlistTitle = styled.div``;
const WishlistPrice = styled.div``;
const CartRows = styled.div``;
const CartRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 5px 0;
`;
const CartImage = styled.img`
  width: 80px;
  height: 100px;
`;
const CartDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const CartTitle = styled.div``;
const CartInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const CartPrice = styled.span``;
const CartQuantity = styled.div`
  display: flex;
  min-width: 80px;
`;
const QuantityButton = styled.button`
  background-color: white;
  border: none;
  margin: 0 5px;

  cursor: pointer;
`;
const Total = styled.div`
  font-size: 24px;
  text-align: center;
  color: white;
  background-color: black;
`;
function Dashboard() {
  const wishlist = useSelector((state) => state.whishlist);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(init());
  }, []);

  const logoutUser = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(deleteAll());
  };

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
          <GridItem>
            <Title>Profile</Title>

            {!user.currentUser && "none"}
            {user.currentUser && (
              <ProfileRows>
                <ProfileRow>
                  <ProfileRowTitle>Name</ProfileRowTitle>
                  <ProfileRowInfo>
                    {user.currentUser.name.split(" ")[0]}
                  </ProfileRowInfo>
                </ProfileRow>
                <ProfileRow>
                  <ProfileRowTitle>Last Name</ProfileRowTitle>
                  <ProfileRowInfo>
                    {user.currentUser.name.split(" ")[1]}
                  </ProfileRowInfo>
                </ProfileRow>
                <ProfileRow>
                  <ProfileRowTitle>Email</ProfileRowTitle>
                  <ProfileRowInfo>{user.currentUser.email}</ProfileRowInfo>
                </ProfileRow>
              </ProfileRows>
            )}
          </GridItem>
          <GridItem>
            <Title>Wishlist</Title>

            {(!user.currentUser || wishlist.products.length === 0) && "empty"}
            <WishlistRows>
              {user.currentUser &&
                wishlist.products.map((item, index) => {
                  return (
                    <WishlistRow key={item._id}>
                      <WishlistImage src={item.img} />
                      <WishlistDesc>
                        <WishlistTitle>{item.title}</WishlistTitle>
                        <WishlistPrice>${item.price}</WishlistPrice>
                      </WishlistDesc>
                    </WishlistRow>
                  );
                })}
            </WishlistRows>
          </GridItem>

          <GridItem>
            <Title>Cart</Title>

            {(!user.currentUser || cart.products.length === 0) && "empty"}
            <CartRows>
              {user.currentUser &&
                cart.products.map((item, index) => {
                  return (
                    <CartRow key={item._id}>
                      <CartImage src={item.img} />
                      <CartDesc>
                        <CartTitle>{item.title}</CartTitle>
                        <CartInfo>
                          <CartPrice>${item.price}</CartPrice>
                          <CartQuantity>
                            <QuantityButton
                              onClick={() => {
                                add(item._id, user);
                              }}
                              disabled={cart.isFetching}
                            >
                              <FontAwesomeIcon icon={faArrowUp} />
                            </QuantityButton>
                            {item.amount}
                            <QuantityButton
                              onClick={() => {
                                remove(item._id, user);
                              }}
                              disabled={cart.isFetching}
                            >
                              <FontAwesomeIcon icon={faArrowDown} />
                            </QuantityButton>
                          </CartQuantity>
                        </CartInfo>
                      </CartDesc>
                    </CartRow>
                  );
                })}
            </CartRows>
            {user.currentUser && cart.products.length > 0 && (
              <Total>
                <b>total:</b> ${cart.total}
              </Total>
            )}
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
