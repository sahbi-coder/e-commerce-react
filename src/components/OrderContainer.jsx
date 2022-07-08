import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { useRef } from "react";
import TransitionsModal from "../components/TransitionsModal";
import Btn from "@material-ui/core/Button";
const GridItem = styled.div`
  border: 2px #514f4d solid;
  padding: 10px;
`;
const Title = styled.h4`
  text-align: start;
  font-size: 28px;
`;
const MainItem = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const OrderNumber = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubItem = styled.div`
  width: 100%;
  padding-left: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderRaws = styled.div`
  display: none;
`;
const OrderRaw = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 5px 0;
`;

const OrderImage = styled.img`
  width: 80px;
  height: 100px;
`;
const OrderDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const OrderTitle = styled.div``;
const OrderPrice = styled.div``;
const OrderAmount = styled.div``;
const Info = styled.p`
  word-wrap: break-word;
  max-width: 80%;
`;

function OrderContainer() {
  const order = useSelector((state) => state.order);
  const ref = useRef([]);
  const setRefs = (el) => {
    ref.current.push(el);
  };
  const toggleOrder = (e, index) => {
    if (ref.current[index].style.display === "none") {
      return (ref.current[index].style.display = "block");
    }
    ref.current[index].style.display = "none";
  };

  return (
    <GridItem>
      <Title>Order History</Title>
      {!order.orders.length && "order history is empty"}

      {order.orders.length > 0 &&
        order.orders.map((item, index) => {
          return (
            <div>
              <MainItem>
                <OrderNumber>{`order ${index + 1}`}</OrderNumber>
                <Button
                  onClick={(e) => {
                    toggleOrder(e, index);
                  }}
                >
                  <AddIcon />
                </Button>
              </MainItem>
              <OrderRaws ref={(el) => setRefs(el)}>
                {item.products.map((i) => {
                  return (
                    <>
                      <SubItem>
                        <OrderRaw key={i._id}>
                          <OrderImage src={i.img} />
                          <OrderDesc>
                            <OrderTitle>{i.title}</OrderTitle>
                            <OrderPrice>${i.price}</OrderPrice>
                            <OrderAmount>amount: {i.amount}</OrderAmount>
                          </OrderDesc>
                        </OrderRaw>
                      </SubItem>
                    </>
                  );
                })}
                <SubItem>
                  <Info style={{ fontWeight: "bold" }}>address:</Info>
                </SubItem>
                <SubItem>
                  <Info>{item.address}</Info>
                </SubItem>
                <SubItem>
                  <Info style={{ fontWeight: "bold" }}>phone:</Info>
                </SubItem>
                <SubItem>
                  <Info>{item.phone.countryCode + "" + item.phone.number}</Info>
                </SubItem>
                <SubItem>
                  <TransitionsModal index={index} />
                  {/* <Btn variant="text">drop</Btn> */}
                </SubItem>
              </OrderRaws>
            </div>
          );
        })}
    </GridItem>
  );
}

export default OrderContainer;
