import React from "react";
import styled from "styled-components";
import {
  start,
  success,
  failure,
  addAmount,
  removeAmount,
} from "../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { removeAmounfromDb, addToAmountDb } from "../apiCalls";
import { useDispatch } from "react-redux";
const GridItem = styled.div`
  border: 2px #514f4d solid;
  padding: 10px;
`;
const Title = styled.h4`
  text-align: start;
  font-size: 28px;
`;

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
function CartContainer({cart,user}) {
  const dispatch = useDispatch();
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
  );
}

export default CartContainer;
