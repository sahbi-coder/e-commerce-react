import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Btn from "@mui/material/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postOrder, getOrders } from "../apiCalls";
import { setOrders } from "../redux/orderSlice";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
export default function TransitionsModal({ index }) {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [address, setAdress] = useState("");
  const [countryCode, setCode] = useState("");
  const [error, setError] = useState(false);
  const [pendingError, setPendingError] = useState(false);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res2 = await getOrders(user.currentUser._id);

      if (res2.request.status === 200) {
        const orders = res2.data[0].orders;
        const orderCopy = JSON.parse(
          JSON.stringify(res2.data[0].orders[index])
        );
        if (orderCopy.status === "pending") {
          const phone = {
            number,
            countryCode,
          };

          orderCopy.phone = phone;
          orderCopy.address = address;
          orders.splice(index, 1, orderCopy);
        }
        if (orderCopy.status !== "pending") {
          setPendingError(true);
        }

        const res1 = await postOrder({ orders }, res2.data[0]._id);
        if (res1.request.status === 200) {
          setOpen(false);
          return dispatch(setOrders(res1.data.orders));
        }
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div>
      <Btn onClick={() => setOpen(true)}>modify</Btn>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
          setError(false);
          setPendingError(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FormGroup>
              <FormRow>
                <Label htmlFor="code" />
                your country code:
                <Label />
                <CountryCode
                  id="code"
                  type="text"
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
            <Button onClick={handleSubmit}>SUBMIT CHANGES</Button>
            {error && <Message>oops! something went wrong</Message>}
            {pendingError && (
              <Message>sorry! you can't modify shipped orders</Message>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
