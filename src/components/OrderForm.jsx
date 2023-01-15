import styled from "styled-components";
import { useState} from "react";
import { setOrderToAdd } from "../redux/orderSlice";
import { getCardDb} from "../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../apiCalls";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  height: 50vh;
  width: 50vw;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  max-width: 550px;
`;
const Address = styled.textarea`
  width: 100%;
  resize: vertical;
  margin: 10px 0;
`;
const CountryCode = styled.input`
  width: 100%;
  margin: 10px 0;
`;

const PhoneNumber = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
  width: 100%;
  margin: 10px 0;
`;
const Label = styled.label`
  width: 100%;
  text-align: start;
  font-size: 9px;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  color: white;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
`;
const FormGroup = styled.fieldset`
  width: 100%;
  padding: 10px;
`;
const FormRow = styled.div`
  width: 100%;
`;
const Message = styled.div`
  width: 100%;
  text-align: center;
  color: hsla(0, 100%, 50%, 0.651);
`;

function OrderForm() {
  const [success, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAdress] = useState("");
  const [countryCode, setCode] = useState(0);
  const [number, setNumber] = useState(0);
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCardDb(user.currentUser._id);

      const newProducts = [...res.data.products].reduce((pre, cur) => {
        const { _id, ...others } = cur;
        pre.push(others);
        return pre;
      }, []);

      const amountArray = [...res.data.products].reduce((pre, acc) => {
        pre.push({ productId: acc.productId, amount: acc.amount });
        return pre;
      }, []);

      const newOrder = {
        products: newProducts,
        address,
        phone: {
          countryCode,
          number,
        },
      };
      const res2 = await getOrders(user.currentUser._id);

      if (res2.request.status === 200) {
        setError(false);
        setSucess(true);
        dispatch(setOrderToAdd(newOrder));
        navigate("/payment/stripe", {
          state: {
            amountArray,
            postParams: {
              body: { orders: [...res2.data[0].orders, newOrder] },
              id: res2.data[0]._id,
            },
          },
        });
      }
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormRow>
            <Label htmlFor="code" />
            your country code:
            <Label />
            <CountryCode
              id="code"
              type="number"
              placeholder="your country code"
              name="country code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="number" />
            your phone number:
            <Label />
            <PhoneNumber
              id="number"
              type="number"
              name="phone number"
              placeholder="your phone number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="address" />
            your address:
            <Label />
            <Address
              id="address"
              rows={5}
              type="text"
              placeholder="your address"
              onChange={(e) => setAdress(e.target.value)}
            ></Address>
          </FormRow>
        </FormGroup>
        <Button disabled={success}>NEXT</Button>
        {error && <Message>oops! something went wrong</Message>}
      </Form>
    </Container>
  );
}

export default OrderForm;
